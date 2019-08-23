import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { getImage } from './index';
import { isAuth, path } from '../../Auth';
import { updatePostRequest,  getPostRequest, deletePostRequest, modifyCommentRequest } from '../../API/postAPI';
import PostCardExpanded from './PostCardExpanded';
import Footer from '../std/Footer';
//import Blurb from '../std/Blurb';


class Post extends Component {
    state = {
        post: '',
        comments: [],
        isEdited: false,
        isDeleted: false
    } // state

    getUserImage( user ) {
        const date = new Date().getTime()
        return user ? path( `user/photo/${ user._id }?${ date }` ) : undefined
    } // getImage

    componentDidMount() {
        //this.setState( { comments: this.props.comments } )
        this.commentData = new FormData()
        getPostRequest( this.props.match.params.postId ).then( data => {
            if ( data.error ) console.log( data.error )
            else this.setState( { post: data, comments: data.comments } )
        }) // then
    } // componentDidMount

    handleClickDelete = post => () => {
        deletePostRequest( post._id, isAuth().token ).then( data => {
            if ( data.error ) console.log( data.error )
            else this.setState( { isDeleted: true } )
        }) // then
    } // handleClickDelete
    
    handleClickUpdate = post => () => {
        this.setState( { isEdited: true } )
    } // handleClickUpdate

    addNewComment = newComments => {
        /*
             IMPORTANT: newComments.reverse() will reverse the list of comments
        */
        this.setState( { comments: newComments } )
    } // addNewComment

    modifyComment = ( comments, modifiedText ) => {
        this.setState( { comments } )
        // //const modifiedComment = { ...comment, text: modifiedText }
        // const i = this.state.comments.findIndex( e => e._id === comment._id )
        // let post = this.state.post
        // //let comments = this.state.comments
        // //comments[ i ] = modifiedComment
        // //comments[ i ].text = modifiedText
        // post.comments[ i ] = modifiedText
        // //this.commentData.set( 'comments', comments )
        // const auth = isAuth()
        // modifyCommentRequest( auth.user._id, this.state.post._id, auth.token, post.comments )
        // .then( data => {
        //   if ( data.error ) console.log( data.error )
        //   else this.setState( { comments: data.comments } )
        // }) // then
        
        // // updatePostRequest( this.state.post._id, auth.token, this.commentData )
        // // .then( data => {
        // //         if ( data.error ) {
        // //             this.setState( { error: data.error.error } ) 
        // //             return
        // //         } // if
        // //         console.log('New post: ', data)
        // //         this.endLoading()
        // //         this.setState( { post: data, comments: data.comments } )
        // // }) // then
    } // modifyComment

    render() {
        const { post, comments, isEdited, isDeleted } = this.state
        // const { post, comments, image, textLimit } = this.props
console.log('this.state.post: ', this.state.post )
console.log('comments: ',comments )
        return (
            isEdited ? <Redirect to={ `/post/edit/${ post._id }` } /> :
                        
            isDeleted ? <Redirect to='/posts' /> :
            
            <main>
                {/* <Blurb body='something blar blar' /> */}
                <Container style={ { paddingTop: '100px', paddingBottom: '100px' } } maxWidth="lg" >
                    <PostCardExpanded 
                        post={ post }
                        comments={ comments }
                        image={ getImage( post ) }
                        //textLimit={ textLimit }
                        updateButtonHandler={ this.handleClickUpdate }
                        deleteButtonHandler={ this.handleClickDelete }
                        commentHandler={ this.addNewComment }
                        // modifiedCommentHandler={ this.modifyComment }
                    />
                </Container>
                <Footer title='Post footer' contents={ 'Add contents here' } />
            </main>
        ) // return
    } // render
} // Post

export default Post;






// import React, { Component } from 'react';
// import Container from '@material-ui/core/Container';
// import { Link } from 'react-router-dom';
// import Typography from '@material-ui/core/Typography';
// import { isAuth, path } from '../../Auth';
// import { getPostRequest } from '../../API/postAPI';
// import { getImage } from './index';
// import Footer from '../std/Footer';
// import Blurb from '../std/Blurb';
// import { makeStyles } from '@material-ui/core/styles';
// import { Divider } from '@material-ui/core';
// import PostCard from './PostCard';
// import PostCardExpanded from './PostCardExpanded';

// const useStyles = makeStyles(theme => ({
//     container: {
//         paddingTop: '100px', 
//         paddingBottom: '100px',
//     },
// })) // useStyles

// const PostContents = props => {
//     const { post, comments, commentHandler } = props
//     const classes = useStyles();
//     return (
//         <main>
//             {/* <Blurb body='something blar blar' /> */}
//             <Container style={ { paddingTop: '100px', paddingBottom: '100px' } } maxWidth="lg" >
//                 <PostCardExpanded 
//                     post={ post } 
//                     image={ getImage( post ) }
//                     comments={ comments }
//                     commentHandler={ commentHandler } 
//                 />
//             </Container>
//             <Footer title='Post footer' contents={ 'Add contents here' } />
//         </main>
//     ) // return
// } // PostContents


// class Post extends Component {
//     state ={
//         post: '',
//         comments: []
//     } // state

//     getUserImage( user ) {
//         const date = new Date().getTime()
//         return user ? path( `user/photo/${ user._id }?${ date }` ) : undefined
//     } // getImage

//     componentDidMount() {
//         getPostRequest( this.props.match.params.postId ).then( data => {
//             if ( data.error ) console.log( data.error )
//             else this.setState( { post: data, comments: data.comments } )
//         }) // then
//     } // componentDidMount

//     // comments: [
// 	// 	{
// 	// 		text: String,

// 	// 		created: {
// 	// 			type: Date,
// 	// 			default: Date.now
// 	// 		}, // created
			
// 	// 		postedBy: {
// 	// 			type: ObjectId,
// 	// 			ref: 'User'
// 	// 		} // postedBy
// 	// 	}
// 	// ] // comments

//     // handleSubmitComment = ( event, value ) => {
//     //     event.preventDefault();
//     //     const commenter = isAuth().user
//     //     const comment = {
//     //     id: Math.floor(Math.random() * 100000).toString(),
//     //     photo: this.getUserImage( commenter ),
//     //         // 'https://api-cdn.spott.tv/rest/v004/image/images/e91f9cad-a70c-4f75-9db4-6508c37cd3c0?width=587&height=599',
//     //     userName: commenter.name,
//     //     content: value,
//     //     createdAt: Date.now(),
//     //     };
//     //     this.setState(prevState => ({ comments: [...prevState.comments, comment] }));
//     // } // handleSubmitComment

//     render() {
//         const { post, comments } = this.state
// console.log('comments: ', comments)
//         return (
//             <PostContents 
//                 post={ post }
//                 comments={ comments } 
//                 commentHandler={ this.handleSubmitComment } 
//             />
//           ) // return
//     } // render
// } // Post

// export default Post;

