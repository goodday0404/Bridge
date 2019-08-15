import { path, postData, dataAccess, requestServer } from './index';

export const postRequest = async ( userId, token, post ) => {
    //console.log('user data update: ', user)
        const headers = { Accept: 'application/json', Authorization: `Bearer ${ token }`}
        return requestServer( `post/new/${ userId }`,
                              { method: 'POST', headers, body: post }, 
                              'Uploading a post success!' )
} // postRequest

export const getAllPostsRequest = async () => (
    requestServer( 'posts', { method: 'GET' }, 'Retrieving posts success!' )
) // signUpProcess

export const getPostRequest = async postId => (
    requestServer( `post/${ postId }`, { method: 'GET' }, 'Retrieving a post success!' )
) // signUpProcess

export const getMyPostsRequest = async ( postId, token ) => (
    requestServer( `posts/by/${ postId }`, 
                   { method: 'GET', ...dataAccess( 'GET', token ) }, 
                   'Retrieving a post success!' )
) // signUpProcess