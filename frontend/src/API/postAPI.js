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

export const updatePostRequest = async ( postId, token, post ) => {
    //console.log('post data update: ', post)
        const headers = { Accept: 'application/json', Authorization: `Bearer ${ token }`}
        return requestServer( `post/${ postId }`,
                              { method: 'PUT', headers, body: post }, 
                              'Updating user post success!' )
} // updatePostRequest

export const deletePostRequest = async ( postId, token ) => (
    requestServer( `post/${ postId }`, 
                    dataAccess( 'DELETE', token ), 
                    'Deleting a post success!' )
) // deletePostRequest

// export const addCommentRequest = async ( userId, postId, token, comment ) => {
//     const body = JSON.stringfy( { userId, postId, comment } )
//     return requestServer( `post/comment`, 
//                           { ...dataAccess( 'PUT', token ), body },
//                           'Adding a comment success!' )
// } // addCommentRequest

export const commentRequest = async ( userId, postId, token, comment, event ) => {
    const body = JSON.stringfy( { userId, postId, comment } )
    return requestServer( `post/${ event }`, 
                          { ...dataAccess( 'PUT', token ), body },
                          'Adding/Deleting a comment success!' )
} // addCommentRequest

export const addCommentRequest = async ( userId, postId, token, comment ) => (
    commentRequest( userId, postId, token, comment, 'comment' )
) // addCommentRequest

export const uncommentRequest = async ( userId, postId, token, comment ) => (
    commentRequest( userId, postId, token, comment, 'uncomment' )
) // addCommentRequest