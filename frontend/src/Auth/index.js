
const domain = 'http://localhost:8080/'

const path = event => domain.concat( event )

const postData = user => ({
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
}) // data

const getData = () => ( { method: 'GET' } )

const requestServer = async ( event, user, message ) => {
    try {
        const response = await fetch( path( event ), user );
        return await response.json( { message } );
    } catch ( error ) {
        return console.log( error );
    } // catch
} // requestServer

export const signUpProcess = async user => (
    requestServer( 'signup', postData( user ), 'SignUp success!')
) // signUpProcess

export const logInProcess = async user => (
    requestServer( 'login', postData( user ), 'LogIn success!')
) // signUpProcess

export const logOutProcess = async call => {
    if ( typeof window !== 'undefined' ) localStorage.removeItem( 'jwt' )
    call()
    return requestServer( 'logOut', getData(), 'LogOut success!')
} // logOut

export const validateJWT = ( JWT, call ) => {
    if ( typeof window === 'undefined' ) return
    // save Jason web token in app local storage
    localStorage.setItem( 'jwt', JSON.stringify( JWT ) )
    call()
} // validateJWT

export const isAuth = () => {
    if ( typeof window === 'undefined' ) return false
    const item = localStorage.getItem( 'jwt' )
    if ( item !== null ) return JSON.parse( item )
    return false
} // isAuth

// export const signUpProcess = async user => {
//     const domain = 'http://localhost:8080/signup'
//     const data = {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         }, // headers
//         body: JSON.stringify( user )
//     } // data
//     try {
//         const response = await fetch(domain, data);
//         return await response.json({ message: 'data fetch success!' });
//     } catch ( error ) {
//         return console.log(error);
//     } // catch
// } // signUpProcess

// export const logInProcess = async user => {
//     const domain = 'http://localhost:8080/login'
//     const data = {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         }, // headers
//         body: JSON.stringify( user )
//     } // data
//     try {
//         const response = await fetch(domain, data);
//         return await response.json({ message: 'data fetch success!' });
//     } catch ( error ) {
//         return console.log(error);
//     } // catch
// } // doSignUp

// export const logOutProcess = async call => {
//     if ( typeof window !== 'undefined' ) localStorage.removeItem( 'jwt' )
//     //history.push( '/' )
//     call()
//     const domain = 'http://localhost:8080/logOut'
//     const data = { method: 'GET' }
//     try {
//         const response = await fetch( domain, data );
//         return await response.json( { msg: 'Logged out successully!' } );
//     } catch ( error ) {
//         return console.log( error );
//     } // catch
// } // logOut

