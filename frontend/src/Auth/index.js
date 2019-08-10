import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

// const domain = 'http://localhost:8080/'

// const path = event => domain.concat( event )

const domain = `${ process.env.REACT_APP_API_URL }`

export const path = event => `${ domain }/${ event }`

const postData = user => ({
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }, // header
    body: JSON.stringify(user)
}) // postData

export const dataAccess = ( action, token ) => ( { 
    method: action,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ token }`
    } // header
} ) // dataAccess

const requestServer = async ( event, user, message ) => {
    try {
        const response = await fetch( path( event ), user );
        return await response.json( { message } );
    } catch ( error ) {
        return console.log( error );
    } // catch
} // requestServer

export const getUserInfo = async ( userId, token ) => (
    requestServer( `user/${ userId }`, dataAccess( 'GET', token ), 'Retrieving user success!' )
) // signUpProcess

export const getAllUserInfo = async () => (
    requestServer( 'users', { method: 'GET' }, 'Retrieving users success!' )
) // signUpProcess

export const signUpProcess = async user => (
    requestServer( 'signup', postData( user ), 'SignUp success!')
) // signUpProcess

export const logInProcess = async user => (
    requestServer( 'login', postData( user ), 'LogIn success!')
) // signUpProcess

export const logOutProcess = async call => {
    if ( typeof window !== 'undefined' ) localStorage.removeItem( 'jwt' )
    call()
    return requestServer( 'logOut', dataAccess('GET', ''), 'LogOut success!')
} // logOut

export const updateProcess = async ( userId, token, user ) => {
console.log('user data update: ', user)
    const headers = { Accept: 'application/json', Authorization: `Bearer ${ token }`}
    return requestServer( `user/${ userId }`,
                          { method: 'PUT', headers, body: user }, 
                          'Updating user profile success!' )
} // signUpProcess

export const deleteUser = async ( userId, token ) => (
    requestServer( `user/${ userId }`, dataAccess( 'DELETE', token ), 'Deleting user success!' )
) // signUpProcess

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

export const authRoute = ( { component: Component, ...rest } ) => {
    const renderFor = props => (
        isAuth() ? <Component { ...props } /> :
                   <Redirect to={ { pathname: '/logIn', 
                                    state: { from: props.location } } } />
    ) // renderFor
    return <Route { ...rest } render={ renderFor } />
} // authRoute

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

