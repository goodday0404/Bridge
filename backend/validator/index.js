const { check, validationResult } = require( 'express-validator' );

exports.createPostValidator = [
		check( 'title', 'title is required').exists(),
		check( 'title', 'title length must be [4, 150]' ).isLength( { min: 4, max: 150 } ),
		check( 'body', 'body is required').exists(),
		check( 'body', 'body length must be [4, 2000]' ).isLength( { min: 4, max: 2000 } )
];

// exports.createPostValidator = ( request, response, next ) => {
// 	const titleLenght = {
// 		min: 4, max: 150
// 	} // titleLenght

// 	const bodyLength = {
// 		min: 4, max: 2000
// 	} // bodyLength
// 	/*
// 		request.check( target, errMsg )
// 	*/
// 	request.check( 'title', 'Title is required').notEmpty();
// 	request.check( 'title', 'Title length must be [4, 150]' ).isLength( titleLenght );

// 	request.check( 'Body', 'Body is required').notEmpty();
// 	request.check( 'Body', 'Body length must be [4, 2000]' ).isLength( bodyLength );

// 	const errors = request.validationErrors();

// 	if ( errors ) { // return only the first error
// 		return errors.map( err => err.msg )[0];
// 	} // if
// 	next(); // proceed to the next middleware
// }; // createPostValidator

const checkFalsy = {checkFalsy: true}

exports.userSignupValidator = [
	// validate name
	check( 'name' ).exists( checkFalsy ).withMessage( 'name is required' ),
	// validate email address
	check( 'email' ).exists( checkFalsy )
				    .withMessage( 'email address is required' )
					.isEmail()
					.withMessage( 'This is not a valid email address' )
					.isLength( { min: 3, max: 32 } )
					.withMessage( 'Email address must be 3 - 32 characters long' ),
	// validate password
	check( 'password' ).exists( checkFalsy )
					   .withMessage( 'password is required' )
					   .isLength( { min: 6, max: 20 } )
					   .withMessage( 'password must be 3 - 32 characters long' )
					   .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
					   .withMessage('Password must include one lowercase character, one uppercase character, a number, and a special character.')									    
]; // userSignupValidator

exports.userSignupErrorHandler = ( request, response, next ) => {
	const error = validationResult( request );
	console.log( error )
	if ( !error.isEmpty() ) {
		const errorList = { error: error.array() };
		return response.status( 422 ).json( errorList );
	} // if
	next();
}; // userSignupErrorHandler

// exports.userSignupValidator = ( request, response, next ) => {
// 	// validate email address
// 	request.check( 'name', 'name is required' ).notEmpty();
// 	request.check( 'email', 'email address contains 3 - 32 characters')
// 		   .matches( /.+\@.+\..+/ ) // regular expression to match email address
// 		   .withMessage( 'Email address must contain @ character' )
// 		   .isLength( { min: 4, max: 2000 } );

// 	// validate password
// 	request.check( 'password', 'password is required').notEmpty();
// 	request.check( 'password' )
// 		   .isLength( { min: 6 } ) // at least 6 characters long
// 		   .withMessage( 'password must be at least 6 characters long')
// 		   .matches( /\d/ )
// 		   .withMessage( 'password must contain a number' );

// 	// error check
// 	const errors = request.validationErrors();

// 	if ( errors ) { // return only the first error
// 		return errors.map( err => err.msg )[0];
// 	} // if
// 	next(); // proceed to the next middleware
// }; // userSignupValidator
