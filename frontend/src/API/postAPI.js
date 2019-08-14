import { path, postData, dataAccess, requestServer } from './index';

export const postRequest = async ( userId, token, post ) => {
    //console.log('user data update: ', user)
        const headers = { Accept: 'application/json', Authorization: `Bearer ${ token }`}
        return requestServer( `post/new/${ userId }`,
                              { method: 'POST', headers, body: post }, 
                              'Updating user profile success!' )
} // postRequest

export const getAllPostsRequest = async () => (
    requestServer( 'posts', { method: 'GET' }, 'Retrieving users success!' )
) // signUpProcess