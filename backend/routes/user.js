const express = require( 'express' );
const { userById, allUsers, getUser, updateUser, deleteUser } = require( '../middlewares/user' );
const { requireLogIn } = require( '../middlewares/auth');

const router = express.Router();

router.get( '/users', allUsers );
// signin is required if user want to access to single user account
router.get( '/user/:userId', requireLogIn, getUser );
// use put method to update( put make a change in an entire instance )
router.put( '/user/:userId', requireLogIn, updateUser );
router.delete( '/user/:userId', requireLogIn, deleteUser );

router.param( 'userId', userById );

module.exports = router;


