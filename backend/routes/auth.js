const express = require( 'express' );

const { signup, logIn, logOut } = require( '../middlewares/auth' );
const { userById } = require( '../middlewares/user' );
const { userSignupValidator, userSignupErrorHandler } = require( '../validator' );

const router = express.Router();

router.post( '/signup', userSignupValidator, userSignupErrorHandler, signup );
router.post( '/login', logIn );
router.get( '/logOut', logOut );

// any router containing :userId, our app will execute first userById() and 
// authorization verification will be performed for the user
/*
	IMPLEMENT AUTHORIZATION 
	
	First step:

		A request is sent to profile update. This is what the url will look like
		'http://localhost:8080/profile/userid23487230423'

		When there is userid in the incoming request( url ) based on the userid,
		our backend will make a query to DB and load that user information( name, email, etc )
		then we will add that information to the request object like so:
		'req.profil = userInformation'.

	Second step:

		Add a property called auth in requirelogIn() so that we know the user is autenticated

	Third step:

		create hasAuthorization() to make sure the req object has 

		'req.profile && req.auth && req.profile._id === req.auth._id;'

*/
router.param( 'userId', userById );

module.exports = router;


