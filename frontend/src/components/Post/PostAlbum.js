import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Hidden from '@material-ui/core/Hidden';
// import Link from '@material-ui/core/Link';
// import Button from '@material-ui/core/Button';
// import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import useStyles from '../../styles/PostAlbumStyle';
import PostCard from './PostCard';
// import Markdown from './Markdown';
// import post1 from './blog-post.1.md';
// import post2 from './blog-post.2.md';
// import post3 from './blog-post.3.md';
import Blurb from '../std/Blurb';
import Footer from '../std/Footer';
import { path } from '../../Auth';

const featuredPosts = [
    {
      title: 'Featured post',
      date: 'Nov 12',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
    },
    {
      title: 'Post title',
      date: 'Nov 11',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
    },
    {
        title: 'Featured post',
        date: 'Nov 12',
        description:
          'This is a wider card with supporting text below as a natural lead-in to additional content.',
      },
      {
        title: 'Post title',
        date: 'Nov 11',
        description:
          'This is a wider card with supporting text below as a natural lead-in to additional content.',
      },
      {
        title: 'Featured post',
        date: 'Nov 12',
        description:
          'This is a wider card with supporting text below as a natural lead-in to additional content.',
      },
      {
        title: 'Post title',
        date: 'Nov 11',
        description:
          'This is a wider card with supporting text below as a natural lead-in to additional content.',
      },
      {
        title: 'Featured post',
        date: 'Nov 12',
        description:
          'This is a wider card with supporting text below as a natural lead-in to additional content.',
      },
      {
        title: 'Post title',
        date: 'Nov 11',
        description:
          'This is a wider card with supporting text below as a natural lead-in to additional content.',
      },
  ];

const getImage = post => {
  return path( `post/photo/${ post._id }` ) 
} // getImage

const PostAlbum = props => {
    const classes = useStyles();
    const { searched } = props
    const image = undefined
    
    return (
        <React.Fragment>
        <CssBaseline />
        <main>
            <Blurb body='Post what help you need here. Tutors will contact you.' />
            <Container className={classes.cardGrid} maxWidth="lg">
                <Grid container spacing={4} className={classes.cardGrid}>
                    { searched.map( ( post, i ) => (
                        <Grid item key={ `${post.title}${ i }` } xs={12} md={6}>
                            <PostCard 
                                // postId={ post._id }
                                // posterId={ posterId( post.postedBy ) }
                                // posterName={ posterName( post.postedBy ) }
                                // title={ post.title } 
                                // date={ post.date }
                                // description={ post.description }
                                post={ post } 
                                image={ getImage( post ) }
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            </main>
            <Footer title='Posts footer' contents={ 'add something here' } />
        </React.Fragment>
        
    ) // return
} // PostAlbum

export default PostAlbum;

