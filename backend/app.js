const express = require( 'express' );
const mongoose = require( 'mongoose' ); // mongoDB interface
const morgan = require( 'morgan' ); // // middleware
const dotenv = require( 'dotenv' ); 
const bodyParser = require( 'body-parser' ); // middleware
const cookieParser = require( 'cookie-parser' );
const fs = require( 'fs' );
const cors = require( 'cors' );
//const expressValidator = require( 'express-validator' );

const app = express();
const port = process.env.PORT || '8080'; // set port

dotenv.config(); // use environment variables in .env file

// DB
// if we use local mongoDB installed,
// change MONGO_URI to MONGO_URI=mongobd://localhost/nodeapi in .env file

const parseOption =  { useNewUrlParser: true };

mongoose.connect( process.env.MONGO_URI, parseOption )
.then( () => console.log( 'DB is conneced' ));

mongoose.connection.on( 'error', err => {
	console.log( `DB connection error: ${err.message}` );
});

// bring in routes() middleware module )
const postRoutes = require( './routes/post' ); //  handling posting request
const authRoutes = require( './routes/auth'); // handling auth
const userRoutes = require( './routes/user');

// middlewares
/*
	express().use( middleware ): set middleware to use
*/
app.use( morgan('dev') );
app.use( bodyParser.json() );
app.use( cookieParser() );
app.use( cors() );
//app.use( expressValidator() );

/*
	Middlewares can be customized
*/
const myMiddleware = ( request, response, next ) => {
	console.log( 'my middleware is executed');
	next(); // advance to the next possible execution
}; // myMiddleware

app.use( myMiddleware );

// receive request and respond it by using middleware module
app.use( '/', postRoutes );
app.use( '/', authRoutes );
app.use( '/', userRoutes );
app.use( function ( err, req, res, next ) {
  if ( err.name === 'UnauthorizedError' ) {
    res.status( 401 ).json( { error: 'UnauthorizedError' } );
  } // if
} );

app.get( '/', ( request, response ) => {
	fs.readFile( 'docs/apiDocs.json', ( err, data ) => {
		if ( err ) return response.status( 400 ).json( { error: err } );
		const docs = JSON.parse( data );
		response.json( docs );
	} );
} );

/*
	express().listen( port, callback ):
*/
app.listen( port, () => {
	console.log( `Node js API is listening on port: ${ port }` )
}); 

