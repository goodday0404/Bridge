/*
	functions to controll posting logics
*/
const _ = require( 'lodash');
const formidable = require( 'formidable' );
const Post = require( '../models/post'); 
const fs = require( 'fs' ); // Node.js module

const { validationResult } = require( 'express-validator' );

const createErrorObj = ( response, error, code ) => {
	return response.status( code ).json( { error } );
}; // createErrorObj

/*
	delete post:

		whenever there is post id in the url, execute postById().

		postById() will query the DB and return that post, also populate the user who

		created the post and make post available in request like so request.post

	isPoster(): 

		request.post && request.auth && request.postedBy._id === request.auth._id
*/
exports.postById = ( request, response, next, id ) => {
//console.log('postById is called')
	Post.findById( id )
		.populate( 'postedBy', '_id name')
		.exec( ( err, post ) => {
			if ( err || !post ) return createErrorObj( response, err, 400 );
			request.post = post;
//console.log('request.post: ', request.post)
			next();
		} );
}; // postedById


exports.getPosts = ( request, response ) => {
	const posts = Post.find()
					  .populate( 'postedBy', '_id name' )
					  .select( 'id title body' ) // select properties of object only we want
					  .then( posts => {
					  	// same with response.status(200).json( { posts: posts }
					  	// since status(200) is set as default

					  	// also if an object has identical name of key and value pair,
					  	// specify only one name.
					  	// eg) { posts: posts } is same with { posts }
					  	response.json( { posts } )
					  }) // then
					  .catch( err => console.log( err ) );
}; // getPosts

// create a post based on the information from the request
exports.createPost = ( request, response, next ) => {

	let form = new formidable.IncomingForm();
	form.keepExtensions = true;

	const hadleParse = ( err, fields, files ) => {

		// handle the given files
		const handleFile = () => {
			const photo = files.photo;
			if ( photo ) {
				photo.data = fs.readFileSync( photo.path );
				photo.contentType = photo.type;
			} // if
		}; // handleFile

		const savePost = ( err, post ) => {
			if ( err ) return createErrorObj( response, err, 400 );
			response.json( post );
		}; // savePost

		if ( err ) {
			return createErrorObj( response, { error: 'Image could not be uploaded!' }, 400 );
		} // if
		
		let post = new Post( fields ); // fields come from request
		const profile = request.profile;
		profile.hashed_password = profile.salt = undefined;
		post.postedBy = request.profile;
		// console.log( "profile", request.profile );
		handleFile();
		post.save( savePost ); 
	}; // hadleParse

	form.parse( request, hadleParse );
	// const errors = validationResult( request );
	// if ( !errors.isEmpty() ) {
	// 	const errorList = { errors: errors.array() };
	// 	return response.status( 422 ).json( errorList );
	// } // if

	// const post = new Post( request.body );
	// return post.save().then( result => response.status( 200 ).json( { post: result } ) );
}; // createPost

exports.postByUser = ( request, response ) => {
	const key = { postedBy: request.profile._id };
	Post.find( key )
		.populate( 'postedBy', '_id name' )
		.sort( '_created' )
		.exec( ( err, posts) => {
			if ( err ) return createErrorObj( response, err, 400 );
			response.json( posts );
// console.log('request.post: ', request.post)
		} )
}; // postByUser

exports.isPoster = ( request, response, next ) => {
// console.log('isPoster is called')
	const post = request.post,
		  auth = request.auth;
	let isPoster = post && auth && post.postedBy._id == auth._id;
	if ( !isPoster ) {
		//return response.status( 403 ).json( { error: 'user is not autherized' } );
		return createErrorObj( response, { error: 'user is not autherized' }, 403 )
	}
	next();
}; // isPoster

exports.updatePost = ( request, response, next ) => {
	let post = request.post;
	post = _.extend( post, request.body );
	post.updated = Date.now();
	post.save( err => {
		if ( err ) return createErrorObj( response, err, 400 );
		response.json( post );
	} ); // save
}; // updatePost

exports.deletePost = ( request, response ) => {
	let post = request.post;
	post.remove( ( err, post ) => {
		if ( err ) return createErrorObj( response, err, 400 );
		response.json( { message: 'Post is deleted successfully' } );
	} ); // remove
}; // deletePost






