import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { NotificationImportant } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Divider } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import { SimpleCardMedia, SimpleCardContents, DefaultCardActions } from '../std/Card';
import { posterName } from './index'
import { SimpleCardButton } from '../std/Card';
//import useStyles from '../../styles/PostAlbumStyle';
import useStyles from '../../styles/PostCardExpandedStyle';
import { makeStyles } from '@material-ui/core/styles';
import { PostButtons, getImage } from './index';
import NewComment from '../Comment/NewComment';
import Comments from '../Comment/Comments';
import { isAuth, path } from '../../Auth';
import { getPostRequest, deletePostRequest } from '../../API/postAPI';
import CircularIndeterminate from '../Loading/CircularIndicator';
import Footer from '../std/Footer';
import Blurb from '../std/Blurb';
import MarkDown from '../std/MarkDown';

const imageStyle={ 
    height: '400px', 
    width: 'auto', 
    paddingBottom: '20px', 
    objectFit: 'cover',
    marginLeft: 'auto',
    marginRight: 'auto'
} // imageStyle

const isLogInUser = ( logInUser, poster ) => {
    return logInUser && ( poster != undefined ) && logInUser._id === poster._id
} // isLogInUser

const PlaceAndHours = props => {
    const { post, author } = props
    const classes = useStyles()

    return (
        <CardContent>
            <Grid container justify='center' alignItems='center' > 
                <Avatar className={ classes.schoolAvatar } >
                    <NotificationImportant />
                </Avatar>
                <Typography className={ classes.name } variant="subtitle1" color="textSecondary">
                    { author } prefer to have tutoring in
                </Typography>
            </Grid>
            <Typography className={ classes.name } variant="subtitle1" color="primary">
                { post.place }
            </Typography>
            <Typography className={ classes.name } variant="subtitle1" color="secondary">
                for {" "} { post.hours }
            </Typography>
        </CardContent>
    ) // return
} // PlaceAndHours

const PostCardExpanded = React.forwardRef( ( props, ref ) => {
    const classes = useStyles()
    const { post, image, comments, textLimit, updateButtonHandler, deleteButtonHandler, 
            commentHandler, modifiedCommentHandler, isLoading } = props
// console.log('props.post: ', post)
    const isAuthor = isLogInUser( isAuth().user, post.postedBy )
    const haveImage = post.photo
    const author = posterName( post.postedBy )
// console.log('passed comments: ', comments)
// console.log('comments.length: ', comments.length)
    return (
        // <CardActionArea component='a' href={ postPath } >
            //author === 'Unknown' ?
            post.created === undefined ?
            <CircularIndeterminate style={ { height: '200px' } } /> :
            
            <Card className={classes.card}>
                <div className={classes.cardDetails} >            
                    <CardContent>
                        <div ref={ ref }>
                        <Typography className={ classes.title } component="h1" variant="h2">
                            { post.title }
                        </Typography>
                        </div>
                        <Typography className={ classes.name } variant="subtitle1" color="textSecondary">
                            <p className='font-italic' >
                                Posted by { author } 
                                {' on '}
                                { new Date( post.created ).toDateString() } 
                            </p>
                        </Typography>
                        {   // Edit & Delete Post buttons
                            isAuthor && <PostButtons 
                                            post={ post } 
                                            leftLabel='Edit Post'
                                            rightLabel='Delete Post'
                                            leftButtonHandler={ updateButtonHandler }
                                            rightButtonHandler={ deleteButtonHandler }
                                        /> 
                        } 
                        <hr/>
                        {/* { isLoading && <CircularIndeterminate /> } */}
                        {   // Display image if it exists
                            haveImage && 
                            <SimpleCardMedia   
                                image={ image } title={ post.title } style={ imageStyle } 
                            />
                        }
                        {/* <Typography className={ classes.body } variant="subtitle1" paragraph>
                            { textLimit ? post.body.substring( 0, 200 ) : post.body }
                        </Typography> */}
                        <MarkDown className={ classes.markdown } >
                            { textLimit ? post.body.substring( 0, 200 ) : post.body }
                        </MarkDown>
                        <PlaceAndHours post={ post } author={ author } />
                    </CardContent>
                    <DefaultCardActions label='Back to Posts' to='/posts' />
                    <hr style={ { marginLeft: '15px', marginRight: '15px' } } />
                </div>
                <div style={ { paddingBottom: '30px' } } >
                    {/* <NewComment post={ post } onNewComment={ commentHandler } /> */}
                    <NewComment 
                        _id={ post._id } 
                        isPost={ true }
                        onNewComment={ commentHandler } 
                        isTutor={ false }
                    />
                    {/* { 
                        comments.length > 0 && 
                        <Comments 
                            post={ post }
                            comments={ comments } 
                            onDeleteComment={ commentHandler } 
                            // onModifiedComment={ modifiedCommentHandler }
                            onComment={ commentHandler }
                        /> 
                    } */}
                    { 
                        comments.length > 0 && 
                        <Comments 
                            _id={ post._id }
                            comments={ comments } 
                            isPost={ true }
                            // onDeleteComment={ commentHandler } 
                            // onModifiedComment={ modifiedCommentHandler }
                            onComment={ commentHandler }
                            isTutor={ false }
                        /> 
                    }
                    {
                        comments.length > 4 && 
                        <DefaultCardActions 
                            label='Back to Posts' 
                            to='/posts'
                            style={ { paddingTop: '20px' } } 
                        />
                    }
                </div>
            </Card>
        // </CardActionArea>
    ) // return
}) // PostCardExpanded



// export const PostCardContents = props => {
//     const classes = useStyles()
//     const { post, image, comments, textLimit, updateButtonHandler, deleteButtonHandler, 
//             commentHandler } = props
//     const isAuthor = isLogInUser( isAuth().user, post.postedBy )
//     const haveImage = post.photo
// console.log('passed comments: ', comments)
// console.log('comments.length: ', comments.length)
//     return (
//         // <CardActionArea component='a' href={ postPath } >
//             <Card className={classes.card}>
//                 <div className={classes.cardDetails}>            
//                     <CardContent>
//                         <Typography className={ classes.title } component="h1" variant="h2">
//                             { post.title }
//                         </Typography>
//                         <Typography className={ classes.name } variant="subtitle1" color="textSecondary">
//                             <p className='font-italic' >
//                                 Posted by { posterName( post.postedBy ) } 
//                                 {' on '}
//                                 { new Date( post.created ).toDateString() } 
//                             </p>
//                         </Typography>
//                         {   // Edit & Delete Post buttons
//                             isAuthor && <PostButtons 
//                                             post={ post } 
//                                             leftLabel='Edit Post'
//                                             rightLabel='Delete Post'
//                                             leftButtonHandler={ updateButtonHandler }
//                                             rightButtonHandler={ deleteButtonHandler }
//                                         /> 
//                         } 
//                         <hr/>
//                         {   // Display image if it exists
//                             haveImage && 
//                             <SimpleCardMedia   
//                                 image={ image } title={ post.title } style={ imageStyle } 
//                             />
//                         }
//                         <Typography className={ classes.body } variant="subtitle1" paragraph>
//                             { textLimit ? post.body.substring( 0, 200 ) : post.body }
//                         </Typography>
//                     </CardContent>
//                     <DefaultCardActions label='Back to Posts' to='/posts' />
//                     <hr style={ { marginLeft: '15px', marginRight: '15px' } } />
//                 </div>
//                 <div style={ { paddingBottom: '30px' } } >
//                     <NewComment post={ post } onNewComment={ commentHandler } />
//                     { 
//                         comments.length > 0 && 
//                         <Comments 
//                             post={ post }
//                             comments={ comments } 
//                             onDeleteComment={ commentHandler } 
//                         /> 
//                     }
//                 </div>
//             </Card>
//         // </CardActionArea>
//     ) // return
// } // PostCardContents

// class PostCardExpanded extends Component {
//     state = {
//         post: '',
//         comments: [],
//         isEdited: false,
//         isDeleted: false
//     } // state

//     getUserImage( user ) {
//         const date = new Date().getTime()
//         return user ? path( `user/photo/${ user._id }?${ date }` ) : undefined
//     } // getImage

//     componentDidMount() {
//         //this.setState( { comments: this.props.comments } )
//         getPostRequest( this.props.match.params.postId ).then( data => {
//             if ( data.error ) console.log( data.error )
//             else this.setState( { post: data, comments: data.comments } )
//         }) // then
//     } // componentDidMount

//     handleClickDelete = post => () => {
//         deletePostRequest( post._id, isAuth().token ).then( data => {
//             if ( data.error ) console.log( data.error )
//             else this.setState( { isDeleted: true } )
//         }) // then
//     } // handleClickDelete
    
//     handleClickUpdate = post => () => {
//         this.setState( { isEdited: true } )
//     } // handleClickUpdate

//     addNewComment = newComments => {
//         /*
//              IMPORTANT: newComments.reverse() will reverse the list of comments
//         */
//         this.setState( { comments: newComments } )
//     } // addNewComment

//     render() {
//         const { post, comments, isEdited, isDeleted } = this.state
//         // const { post, comments, image, textLimit } = this.props
// console.log('this.state.post: ', this.state.post )
// console.log('comments: ',comments )
//         return (
//             isEdited ? <Redirect to={ `/post/edit/${ post._id }` } /> :
                        
//                         isDeleted ? <Redirect to='/posts' /> :
            
//                                     // <PostCardContents 
//                                     //     post={ post }
//                                     //     comments={ comments }
//                                     //     image={ image }
//                                     //     textLimit={ textLimit }
//                                     //     updateButtonHandler={ this.handleClickUpdate }
//                                     //     deleteButtonHandler={ this.handleClickDelete }
//                                     //     commentHandler={ this.addNewComment }
//                                     // />
//             <main>
//                 {/* <Blurb body='something blar blar' /> */}
//                 <Container style={ { paddingTop: '100px', paddingBottom: '100px' } } maxWidth="lg" >
//                     <PostCardContents 
//                         post={ post }
//                         comments={ comments }
//                         image={ getImage( post ) }
//                         //textLimit={ textLimit }
//                         updateButtonHandler={ this.handleClickUpdate }
//                         deleteButtonHandler={ this.handleClickDelete }
//                         commentHandler={ this.addNewComment }
//                     />
//                 </Container>
//                 <Footer title='Post footer' contents={ 'Add contents here' } />
//             </main>
//         ) // return
//     } // render
// } // PostCardExpanded

export default PostCardExpanded;

