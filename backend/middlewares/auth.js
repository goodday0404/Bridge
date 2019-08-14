const jwt = require( 'jsonwebtoken' );
const expressJwt = require( 'express-jwt' );
const User = require('../models/user');
require( 'dotenv' ).config();

exports.signup = async ( request, response ) => {
	// email given from user input
	const email = { email: request.body.email }; 
	// verify whether the given email is already registered in DB
	const userExists = await User.findOne( email );

	if ( userExists ) {
		const error = { error: [ { msg: 'This email is already registered!' } ] };
		return response.status( 403 ).json( error );
	} // if

	const user = await User( request.body );
	await user.save();
	// respond back to client request
	response.json( { message: 'signup success!' } );
}; // signup

const notAuthorizedError = ( response, error ) => response.status( 401 ).json( error ); 

exports.logIn = ( request, response ) => {
	// find user based on the given email
	const { email, password } = request.body;
	// if error, or no user found
	// if user is found, authenticate
	User.findOne( { email }, ( err, user ) => {
		if ( err || !user ) {
			const msg = "User with the given email doesn't exist. Please sign up";
			const error = { error: [ { msg } ] };
			return notAuthorizedError( response, error );
		} // if

		// if user if found, make sure the given email and password match
		// create authenticate method in module and use here
		if ( !user.authenticate( password ) ) {
			const error = { error: [ { msg: "The given password doesn't match" } ] };
			return notAuthorizedError( response, error );
		} // if

		// generate a token with user id and jwt_secret
		const token = jwt.sign( { _id: user._id }, process.env.JWT_SECRET);
		// persist the token as 't' in cookie with expiry date
		response.cookie( 't', token, { expire: new Date() + 9999 } );
		// return response with user and token to client 
		const { _id, name, email, tutor, courses, program, description, 
				follows, followers } = user;
		return response.json( { token, user: { _id, name, email, tutor, courses, 
								program, description, follows, followers } } );
	} ); // User.findOne

}; // logIn

exports.logOut = ( request, response ) => {
	response.clearCookie( 't' );
	return response.json( { message: 'singout success!' } );
}; // logOut

exports.requireLogIn = expressJwt( {
	// if user is signed in, the user has a token that contain JWT_SECRET as substring.
	// So search JWT_SECRET from the user's token to verify the user is signed in.
	// If the token is valid, express jwt appends the varified user's id in an auth key
	// to the request object
	secret: process.env.JWT_SECRET,
	userProperty: 'auth'
} ); // requireLogIn


