import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { SimpleCardMedia, SimpleCardContents, DefaultCardActions } from '../std/Card';
import { posterName } from './index'
import useStyles from '../../styles/PostAlbumStyle';

const PostCard = props => {
    const classes = useStyles()
    const { post, image, textLimit } = props
    const postPath = `/posts/${ post._id }`

    return (
        // <CardActionArea component='a' href={ postPath } >
            <Card className={classes.card}>
                <div className={classes.cardDetails}>
                    <CardContent>
                        <Typography style={ { paddingBottom: '10px'} } component="h2" variant="h5">
                            { post.title }
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            <p className='font-italic' >
                                Posted by { posterName( post.postedBy ) }
                            </p>
                        </Typography>
                        <Typography style={ { paddingBottom: '10px'} } variant="subtitle1" color="textSecondary">
                            on { new Date( post.created ).toDateString() }
                        </Typography>
                        <hr/>
                        <Typography style={ { paddingBottom: '10px'} } variant="subtitle1" paragraph>
                            { textLimit ? post.body.substring( 0, 200 ) : post.body }
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                            <Link to={ postPath } > Continue reading... </Link>
                        </Typography>
                    </CardContent>
                </div>
                <Hidden xsDown>
                    <SimpleCardMedia    image={ image } title={ post.title } 
                                        style={ { width: 160 } } 
                    />
                </Hidden>
            </Card>
        // </CardActionArea>
    ) // return
} // PostCard

export default PostCard;