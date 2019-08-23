const express = require( 'express' );
const { userById, allUsers, getUser, userPhoto, updateUser, deleteUser, addFollows, 
        addFollowers, deleteFollows, deleteFollowers, updateComment, updateUncomment,
        modifyComment } = require( '../middlewares/user' );
const { requireLogIn } = require( '../middlewares/auth');

const router = express.Router();

/*
    CAUSTION: all routers that contain a substring of 'userId' will execute userById first.
              To avoid executing userById() to cause unexpected behavior, place routers
              that doesn't contain 'userId' substring above routers that contain the 
              substring for each API call.
 */
router.put( '/user/comment', requireLogIn, updateComment );
router.put( '/user/uncomment', requireLogIn, updateUncomment );  
router.put( '/user/modifycomment', requireLogIn, modifyComment );  

router.put( '/user/follow', requireLogIn, addFollows, addFollowers )
router.put( '/user/unfollow', requireLogIn, deleteFollows, deleteFollowers )
router.get( '/users', allUsers );
// signin is required if user want to access to single user account
router.get( '/user/:userId', requireLogIn, getUser );
router.get( '/user/photo/:userId', userPhoto );
// use put method to update( put make a change in an entire instance )
router.put( '/user/:userId', requireLogIn, updateUser );

router.delete( '/user/:userId', requireLogIn, deleteUser );

router.param( 'userId', userById );

module.exports = router;


