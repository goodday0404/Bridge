const _ = require( 'lodash');
const User = require( '../models/user');
const formidable = require( 'formidable' );
const fs = require( 'fs' ); // Node.js module

const createErrorObj = ( response, error, code ) => {
	return response.status( code ).json( { error } );
}; // createErrorObj

exports.userById = ( request, response, next, id ) => {
	User.findById( id )
		.populate( 'follows', '_id name' )
		.populate( 'followers', '_id name' )
		.exec( ( err, user ) => {
		if ( err || !user ) {
			// const error = { error: "user is not found" };
			// return response.status( 400 ).json( error );
			return createErrorObj( response, { error: "user is not found" }, 400 )
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
	User.find( findUsers ).select( 'name email description tutor courses program updated created' ); 
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
	} // handleError
	User.findByIdAndUpdate( request.body.userId, user, handleError )
	next()
} // followTemplate

exports.addFollows = ( request, response, next ) => {
	const follow = { $push: { follows: request.body.followId } }
	followTemplate( request, response, next, follow )
} // addFollows

exports.deleteFollows = ( request, response, next ) => {
	const unfollow = { $pull: { follows: request.body.unfollowId } }
	followTemplate( request, response, next, unfollow )
} // deleteFollows

// exports.addFollows = ( request, response, next ) => {
// 	const body = request.body
// 	const follow = { $push: { follows: body.followId } }
// 	const handleError = ( err, result ) => {
// 		if ( err ) return createErrorObj( response, { error: err }, 400 );
// 	} // handleError
// 	User.findByIdAndUpdate( body.userId, follow, handleError )
// 	next()
// } // addFollows

const unfollowTemplate = ( response, user, id ) => {
	const isNewData = { new: true }
	const handleErrorAndResult = ( err, result ) => {
		if ( err ) return createErrorObj( response, { error: err }, 400 );
		result.hashed_password = result.salt = undefined;
 		response.json( result );
	} // handleError
	User.findByIdAndUpdate( id, user, isNewData )
		.populate( 'follows', '_id name' )
		.populate( 'followers', '_id name' )
		.exec( handleErrorAndResult )
} // followTemplate

exports.addFollowers = ( request, response ) => {
	const follower = { $push: { followers: request.body.userId } }
	unfollowTemplate( response, follower, request.body.followId )
} // addFollows

exports.deleteFollowers = ( request, response ) => {
	const unfollower = { $pull: { followers: request.body.userId } }
	unfollowTemplate( response, unfollower, request.body.unfollowId )
} // addFollows

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


