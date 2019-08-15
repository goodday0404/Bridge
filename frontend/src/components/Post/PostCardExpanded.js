import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { SimpleCardMedia, SimpleCardContents, DefaultCardActions } from '../std/Card';
import { posterName } from './index'
import { SimpleCardButton } from '../std/Card';
//import useStyles from '../../styles/PostAlbumStyle';
import { makeStyles } from '@material-ui/core/styles';
import { PostButton } from './index';

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

const PostButtons = props => {
    const { handler } = props
    return (
        <Grid container spacing={2} justify='center' >
            <PostButton 
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
            />
        </Grid>
    ) // return
} // 

export const PostCardExpanded = props => {
    const classes = useStyles()
    const { post, image, textLimit, handler } = props

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
                        <PostButtons handler={ handler } />
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
                </div>
            </Card>
        // </CardActionArea>
    ) // return
} // PostCardExpanded

export default PostCardExpanded;