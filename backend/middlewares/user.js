const _ = require( 'lodash');
const User = require( '../models/user');
const formidable = require( 'formidable' );
const fs = require( 'fs' ); // Node.js module

const createErrorObj = ( response, error, code ) => {
	return response.status( code ).json( { error } );
}; // createErrorObj

exports.userById = ( request, response, next, id ) => {
	User.findById( id ).exec( ( err, user ) => {
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
	User.find( findUsers ).select( 'name email updated created' ); 
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



