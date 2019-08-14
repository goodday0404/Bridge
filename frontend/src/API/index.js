
const domain = `${ process.env.REACT_APP_API_URL }`

export const path = event => `${ domain }/${ event }`

export const postData = user => ({
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

export const requestServer = async ( event, user, message ) => {
    try {
        const response = await fetch( path( event ), user );
        return await response.json( { message } );
    } catch ( error ) {
        return console.log( error );
    } // catch
} // requestServer
