const mongoose = require( 'mongoose' );
const uuidv1 = require( 'uuid/v1' );
const crypto = require( 'crypto' );
const { ObjectId } = mongoose.Schema;

const userSchemaDetail = {
	name: {
		type: String,
		trim: true, // get rid of unnecessray white spaces
		required: true
	}, // name
	
	email: {
		type: String,
		trim: true,
		required: true
	}, // email

	hashed_password: {
		type: String,
		required: true
	}, // hashedPassword

	salt: String, // randomly generated unique string, used as timestemp

	created: {
		type: Date,
		default: Date.now
	}, // created

	updated: Date, // date when user file is updated

	photo: {
		data: Buffer,
		contentType: String
	}, // photo

	tutor: {	// indicate whether this user is a tutor
		type: String,
		trim: true,
		required: true
	}, // tutor, 

	courses: {	 // courses that the tutor offers lessons
		type: String,
		trim: true,
		//required: true
	}, // courses,

	program: {	// program of study
		type: String,
		trim: true,
	}, // program

	description: {	// decription about an user
		type: String,
		trim: true,
	}, // info

	follows: [ {	// users whom this user follows
		type: ObjectId,
		ref: 'User'
	} ], // follows

	followers: [ {	// users who follow this user
		type: ObjectId,
		ref: 'User'
	} ], // followers

	comments: [
		{
			text: String,

			created: {
				type: Date,
				default: Date.now
			}, // created
			
			postedBy: {
				type: ObjectId,
				ref: 'User'
			}, // postedBy

			//updated: Date, // date when comment is updated
		}
	] // comments
}; // userSchemaDetail

/*
	* Virtual fields are addtional fields for a given model.
	* Their values can be set manually or automatilcally with defined functionality.
	* Keep in mind: virtual properties( password ) don't get persisted in the data base.
	* They only exist locally and are not written to the document's collection.
*/

const userSchema = new mongoose.Schema( userSchemaDetail );

// virtual fields, part of a defined schema. It's userSchema in this case.
userSchema.virtual( 'password' )
		  .set( function( password ) { // *** use function keyword to refer to userSchema ***
		  	// create a temporary variable called _password
		  	this._password = password; // password from user input
		  	// generate a timestemp
		  	this.salt = uuidv1(); // create an unique time stemp
		  	// encryptPassword()
		  	this.hashed_password = this.encryptPassword( password );
		  }) // set
		  .get( function() {
		  	return this._password;
		  }) // get

// methods
userSchema.methods = {
	authenticate: function( plaintext ) {
		return this.encryptPassword( plaintext ) === this.hashed_password;
	}, // authenticate

	encryptPassword: function( password ) {
		if ( !password ) return "";

		try {
			const hassedPassword = crypto.createHmac( 'sha1', this.salt ) // encrypt type, key
						 				 .update( password ) // what we want to encrypt
						 				 .digest( 'hex' );
			return hassedPassword;
		} catch( err ) {
			return "";
		} // catch
	} // encryptPassword
}; // userSchema.methods

module.exports = mongoose.model( 'User', userSchema );
