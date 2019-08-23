const _ = require( 'lodash');
const User = require( '../models/user');
const formidable = require( 'formidable' );
const fs = require( 'fs' ); // Node.js module
const mongoose = require( 'mongoose' );

mongoose.set('useFindAndModify', false);

const createErrorObj = ( response, error, code ) => {
	return response.status( code ).json( { error } );
}; // createErrorObj

exports.userById = ( request, response, next, id ) => {
console.log('find id: ', id)
	User.findById( id )
		.populate( 'follows', '_id name email program description' )
		.populate( 'followers', '_id name email program description' )
		.populate( 'comments.postedBy', '_id name photo')
		.populate( 'postedBy', '_id name')
		//.select('_id title body created comments photo')
		.select(
			'_id name email description tutor courses program updated created comments photo'
		)
		.exec( ( err, user ) => {
		if ( err || !user ) {
			// const error = { error: "user is not found" };
			// return response.status( 400 ).json( error );
			return createErrorObj( response, "user is not found", 400 )
		} // if
		request.profile = user; // add profile object in rqquest with user information
		next();
	} ); 
}; // userById

// hasAuthorization will be used every time when user update, upload, and delete posts.
exports.hasAuthorization = ( request, response, next ) => {
	const profile = request.profile,
		  auth = request.auth,
		  isIdMatched = profile._id === auth._id,
		  isAuthorized = profile && auth && isIdMatched;

	if ( !isAuthorized ) {
		// const error = { error: 'This user is not autherized for this action' };
		// return response.status( 403 ).json( error );
		return createErrorObj( response, 'Not autherized action for this user', 400 )
	} // if
}; // hasAuthorization

exports.allUsers = ( request, response ) => {
	const findUsers = ( err, users ) => {
		if ( err ) { 
			// const error = { error: err };
			// return response.status( 400 ).json( error );
			return createErrorObj( response, { error: err }, 400 );
		} // if
		response.json( users );
	}; // findUsers
	User.find( findUsers ).select( 
		'name email description tutor courses program updated created comments' 
	); 
	// updated field will be available once user post is updated. Using the updated field
	// is available even though the field is not created yet.
}; // allUsers

exports.getUser = ( request, response ) => {
	const profile = request.profile;
	profile.hashed_password = profile.salt = undefined;
	return response.json( profile );
}; // getUser

// exports.updateUser = ( request, response, next ) => {
// 	let user = request.profile;
// 	/*
// 		lodash.extend( source, content ): mustate source with content
// 	*/
// 	user = _.extend( user, request.body ); 
// 	user.updated = Date.now();
// 	const handleSave = ( err ) => {
// 		if ( err ) {
// 			// const error = { error: 'not autherized for this action' };
// 			// return response.status( 400 ).json( error );
// 			return createErrorObj( response, { error: 'not autherized for this action' }, 400 );
// 		} // if
// 		user.hashed_password = user.salt = undefined;
// 		response.json( user );
// 	}; // handleSave
// 	user.save( handleSave );
// }; // updateUser

exports.userPhoto = ( request, response, next ) => {
	const photo = request.profile.photo
	if ( photo.data ) {
		response.set(( "content-Type", photo.contentType ))
		return response.send( photo.data )
	} // if
	next()
} // userPhoto

exports.updateUser = ( request, response, next ) => {
	let form = new formidable.IncomingForm()
	form.keepExtensions = true
	const handleRequest = ( err, newData, imageFile ) => {
		if ( err ) {
			return createErrorObj( response, { error: 'Uploading image file failed' }, 400 );
		} // if
		let userInfo = request.profile
		userInfo = _.extend( userInfo, newData ) // update user data	
		userInfo.updated = Date.now() //  updated time
		if ( imageFile.photo ) {
			const photo = userInfo.photo
			photo.data = fs.readFileSync( imageFile.photo.path )
			photo.contentType = imageFile.photo.type
		} // if
		userInfo.save( ( err ) => {
			if ( err ) return response.status( 400 ).json( { error: err } )
			userInfo.hashed_password = userInfo.salt = undefined
			response.json( userInfo )
		}) // save
	} // handleRequest
	form.parse( request, handleRequest )
} // updateUser

exports.deleteUser = ( request, response, next ) => {
	let user = request.profile;
	const handleRemove = ( err, removedUser ) => {
		if ( err ) {
			// const error = { eror: err };
			// return response.status( 400 ).json( error );
			return createErrorObj( response, { error: err }, 400 );
		} // if
		removedUser.hashed_password = removedUser.salt = undefined;
		response.json( { removedUser } );
	}; // handleRemove
	user.remove( handleRemove );
}; // deleteUser

const followTemplate = ( request, response, next, user ) => {
	const handleError = ( err, result ) => {
		if ( err ) return createErrorObj( response, { error: err }, 400 );
		next()
	} // handleError
	User.findByIdAndUpdate( request.body.userId, user, handleError )
} // followTemplate

// exports.addFollows = ( request, response, next ) => {
// 	const follow = { $push: { follows: request.body.followId } }
// 	followTemplate( request, response, next, follow )
// } // addFollows

// exports.deleteFollows = ( request, response, next ) => {
// 	const unfollow = { $pull: { follows: request.body.unfollowId } }
// 	followTemplate( request, response, next, unfollow )
// } // deleteFollows

// exports.addFollows = ( request, response, next ) => {
// console.log('userId: ', request.body.userId)
// console.log('followId: ', request.body.followId)
// 	const body = request.body
// 	const follow = { $push: { follows: body.followId } }
// 	const handleError = ( err, result ) => {
// 		if ( err ) return createErrorObj( response, { error: err }, 400 );
// 		next()
// 	} // handleError
// 	User.findByIdAndUpdate( body.userId, follow, handleError )
// } // addFollows

// exports.addFollowers = ( request, response ) => {
// 	const body = request.body
// 	const follower = { $push: { followers: body.userId } }
// 	const isNewData = { new: true }
// 	const handleErrorAndResult = ( err, result ) => {
// 		if ( err ) return createErrorObj( response, { error: err }, 400 );
// 		result.hashed_password = result.salt = undefined;
//  		response.json( result );
// 	} // handleError
// 	User.findByIdAndUpdate( body.followId, follower, isNewData )
// 		.populate( 'follows', '_id name' )
// 		.populate( 'followers', '_id name' )
// 		.exec( handleErrorAndResult )
// } // addFollows

const followerTemplate = ( response, follower, id ) => {
	const isNewData = { new: true }
	const handleErrorAndResult = ( err, result ) => {
		if ( err ) return createErrorObj( response, { error: err }, 400 );
		result.hashed_password = result.salt = undefined;
 		response.json( result );
	} // handleError
	User.findByIdAndUpdate( id, follower, isNewData )
		.populate( 'follows', '_id name email program description' )
		.populate( 'followers', '_id name email program description' )
		.exec( handleErrorAndResult )
} // followTemplate

// exports.addFollowers = ( request, response ) => {
// 	const follower = { $push: { followers: request.body.userId } }
// 	followerTemplate( response, follower, request.body.followId )
// } // addFollows

// exports.deleteFollowers = ( request, response ) => {
// 	const unfollower = { $pull: { followers: request.body.unfollowId } }
// 	followerTemplate( response, unfollower, request.body.userId )
// } // addFollows



// exports.deleteFollows = ( request, response, next ) => {
// 	const body = request.body
// 	const follow = { $pull: { follows: body.unfollowId } }
// 	const handleError = ( err, result ) => {
// 		if ( err ) return createErrorObj( response, { error: err }, 400 );
// 	} // handleError
// 	User.findByIdAndUpdate( body.userId, follow, handleError )
// 	next()
// } // deleteFollows

// exports.deleteFollowers = ( request, response ) => {
// 	const body = request.body
// 	const follower = { $pull: { followers: body.userId } }
// 	const isNewData = { new: true }
// 	const handleErrorAndResult = ( err, result ) => {
// 		if ( err ) return createErrorObj( response, { error: err }, 400 );
// 		result.hashed_password = result.salt = undefined;
//  		response.json( result );
// 	} // handleError
// 	User.findByIdAndUpdate( body.unfollowId, follower, isNewData )
// 		.populate( 'follows', '_id name' )
// 		.populate( 'followers', '_id name' )
// 		.exec( handleErrorAndResult )
// } // addFollows





exports.addFollows = (req, res, next) => {
    User.findByIdAndUpdate(req.body.userId, { $push: { follows: req.body.followId } }, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        next();
    });
};

exports.addFollowers = (req, res) => {
    User.findByIdAndUpdate(req.body.followId, { $push: { followers: req.body.userId } }, { new: true })
        .populate('follows', '_id name email program description')
        .populate('followers', '_id name email program description')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json(result);
        });
};

// remove follow unfollow
exports.deleteFollows = (req, res, next) => {
    User.findByIdAndUpdate(req.body.userId, { $pull: { follows: req.body.unfollowId } }, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        next();
    });
};

exports.deleteFollowers = (req, res) => {
    User.findByIdAndUpdate(req.body.unfollowId, { $pull: { followers: req.body.userId } }, { new: true })
        .populate('follows', '_id name')
        .populate('followers', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json(result);
        });
};


const findCommentAndUpdate = ( response, postId, comments ) => {
console.log('findCommentAndUpdate is called')
	User.findByIdAndUpdate( postId, comments, { new: true } )
	.populate( 'comments.postedBy', '_id name')
	.populate( 'postedBy', '_id name')
	.exec( ( error, result ) => {
		if ( error ) return createErrorObj( response, error, 400 )
		else response.json( result )
	}) // exec
} // findCommentAndUpdate
	
exports.updateComment = ( request, response ) => {
	const body = request.body
	const push = { $push: { comments: body.comment } }
	request.body.comment.postedBy = body.userId
	findCommentAndUpdate( response, body.postId, push )
} // updateComment

exports.updateUncomment = ( request, response ) => {
	const body = request.body
	const pull = {
		$pull: {
			comments: {
				_id: body.comment._id
			} // comments
		} // $pull
	} // pull
	findCommentAndUpdate( response, body.postId, pull )
} // updateComment

exports.modifyComment = ( request, response ) => {
//console.log('modifyComment is called')
	const comment = request.body.comment
	User.findOneAndUpdate( 	{ 'comments._id': comment._id }, 
							{
								'$set': {
									'comments.$.text': comment.text,
								} // $set
							} )
	.populate( 'comments.postedBy', '_id name')
	.populate( 'postedBy', '_id name')
	.exec( ( error, result ) => {
//console.log('updated result: ', result)
		if ( error ) return createErrorObj( response, error, 400 )
		else response.json( result )
	}) // exec
} // modifyComment