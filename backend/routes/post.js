/*
	This module works like a 'middleware'.
*/
const express = require('express');
const { getPost, getPosts, createPost, postByUser, postById, isPoster, deletePost, 
		updatePost, postPhoto, updateComment, updateUncomment, modifyComment
	  } = require('../middlewares/post');
const { createPostValidator } = require( '../validator');
const { requireLogIn } = require( '../middlewares/auth');
const { userById } = require( '../middlewares/user' );
const router = express.Router();

router.get( '/posts', getPosts );
// execute middlwares in order where they passed.
// validate data first, then create post if validate.
// **** IMPORTANT: 2nd argument to post must be AN ARRAY of check function calls 
//					for validation ****
router.put( '/post/comment', requireLogIn, updateComment );
router.put( '/post/uncomment', requireLogIn, updateUncomment );  
router.put( '/post/modifycomment', requireLogIn, modifyComment );  
router.post( '/post/new/:userId', requireLogIn, createPost, createPostValidator );
router.get( '/posts/by/:userId', requireLogIn, postByUser );
router.get( '/post/:postId', getPost )
router.get( '/post/photo/:postId', postPhoto );
router.put( '/post/:postId', requireLogIn, isPoster, updatePost );
router.delete( '/post/:postId', requireLogIn, isPoster, deletePost );
// any router containing :userId, our app will execute first userById().
router.param( 'userId', userById );
// any router containing :postId, our app will execute first postById().
router.param( 'postId', postById );

module.exports = router;