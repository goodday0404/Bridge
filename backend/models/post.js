const mongoose = require( 'mongoose' );
const { ObjectId } = mongoose.Schema;

const schema = {
	title: {
		type: String,
		required: true
		// required: "Title is required",
		// minlength: 4,
		// maxlength: 150
	}, // title

	body: {
		type: String,
		required: true
		// required: "Body is required",
		// minlength: 4,
		// maxlength: 2000
	}, // body

	photo: {
		type: Buffer,
		contentType: String
	}, // photo

	postedBy: { // relationship between user and post
		type: ObjectId,
		ref: "User"
	}, // createdBY

	created: {
		type: Date,
		default: Date.now
	} // created
}; // schema

const postSchema = new mongoose.Schema( schema );

module.exports = mongoose.model( 'Post', postSchema );