import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { SimpleCardMedia, SimpleCardContents, DefaultCardActions } from '../std/Card';
import { posterName } from './index'
import { SimpleCardButton } from '../std/Card';
//import useStyles from '../../styles/PostAlbumStyle';
import { makeStyles } from '@material-ui/core/styles';
import { PostButtons } from './index';
import NewComment from '../Comment/NewComment';
import Comments from '../Comment/Comments';
import { isAuth } from '../../Auth';
import { deletePostRequest } from '../../API/postAPI';

const useStyles = makeStyles(theme => ({
    // card: {
    //     display: 'flex',
    // },
    // cardDetails: {
    //     flex: 1,
    // },
    title: {
        textAlign: 'center',
        paddingTop: '10px',
        paddingBottom: '30px',
    },
    name: {
        textAlign: 'center',
    },
    date: {
        textAlign: 'center',
        //paddingBottom: '10px',
    },
    body :{
        fontSize: '20px',
        paddingTop: '30px',
    },
})) // useStyles

const imageStyle={ 
    height: '500px', 
    width: 'auto', 
    paddingBottom: '20px', 
    objectFit: 'cover',
    marginLeft: 'auto',
    marginRight: 'auto'
} // imageStyle

const comments = [
    {
      id: '1',
      photo: 'https://api-cdn.spott.tv/rest/v004/image/images/e91f9cad-a70c-4f75-9db4-6508c37cd3c0?width=587&height=599',
      userName: 'Mike Ross',
      content: 'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. ',
      createdAt: 1543858000000
    }
  ]

const isLogInUser = ( logInUser, poster ) => {
    return logInUser && ( poster != undefined ) && logInUser._id === poster._id
  } // isLogInUser

export const PostCardContents = props => {
    const classes = useStyles()
    const { post, image, textLimit, updateButtonHandler, deleteButtonHandler, 
            commentHandler } = props
    const isAuthor = isLogInUser( isAuth().user, post.postedBy )

    return (
        // <CardActionArea component='a' href={ postPath } >
            <Card className={classes.card}>
                <div className={classes.cardDetails}>
                    
                    <CardContent>
                        <Typography className={ classes.title } component="h1" variant="h2">
                            { post.title }
                        </Typography>
                        <Typography className={ classes.name } variant="subtitle1" color="textSecondary">
                            <p className='font-italic' >
                                Posted by { posterName( post.postedBy ) } 
                                {' on '}
                                { new Date( post.created ).toDateString() } 
                            </p>
                        </Typography>
                        {/* <Typography className={ classes.date } variant="subtitle1" color="textSecondary">
                            on { new Date( post.created ).toDateString() }
                        </Typography> */}
                        { 
                            isAuthor && <PostButtons 
                                            post={ post } 
                                            updateButtonHandler={ updateButtonHandler }
                                            deleteButtonHandler={ deleteButtonHandler }
                                        /> 
                        }
                        {/* <PostButton 
                            label='Update'
                            variant='outlined'
                            color='primary' 
                            // handler={ handler( 'update' ) } 
                        />
                        <PostButton 
                            label='Delete'
                            variant='outlined'
                            color='secondary' 
                            // handler={ handler( 'delete' ) } 
                        /> */}
                        <hr/>
                        <SimpleCardMedia    image={ image } title={ post.title } 
                                            style={ imageStyle } 
                        />
                        <Typography className={ classes.body } variant="subtitle1" paragraph>
                            { textLimit ? post.body.substring( 0, 200 ) : post.body }
                        </Typography>
                    </CardContent>
                    <DefaultCardActions label='Back to Posts' to='/posts' />
                    <NewComment onNewComment={ commentHandler } />
                    <Comments comments={ comments } />
                </div>
            </Card>
        // </CardActionArea>
    ) // return
} // PostCardContents

class PostCardExpanded extends Component {
    state = {
        post: '',
        comments: [],
        route: false
    } // state

    // componentDidMount() {
    //     this.setState( { post: this.props.post } )
    // }

    // componentWillReceiveProps( props ) {
    //     this.setState( { post: props.post } )
    // } // componentWillReceiveProps

    handleClickDelete = post => () => {
console.log('post._id: ', this.state.post._id)
        deletePostRequest( post._id, isAuth().token ).then( data => {
            if ( data.error ) console.log( data.error )
            else this.setState( { route: true } )
        }) // then
    } // handleClickDelete
    
    handleClickUpdate = post => () => {
    
    } // handleClickUpdate

    handleNewComment = event => {

    } // handleClickUpdate

    render() {
        const { post, image, textLimit } = this.props
console.log('this.state.post: ', this.state.post )
console.log('post: ', this.props.post )
        return (
            this.state.route ? 
            <Redirect to='/posts' /> :

            <PostCardContents 
                post={ post }
                image={ image }
                textLimit={ textLimit }
                updateButtonHandler={ this.handleClickUpdate }
                deleteButtonHandler={ this.handleClickDelete }
                commentHandler={ this.handleNewComment }
            />
        ) // return
    } // render
} // PostCardExpanded

export default PostCardExpanded;