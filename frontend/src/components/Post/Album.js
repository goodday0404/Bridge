import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import useStyles from '../../styles/PostStyle';
import Blurb from '../std/Blurb';
import Footer from '../std/Footer';
import PostCard from './PostCard'; 

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
const Album = props => {
    const classes = useStyles();
    const footerContents = 'add something here'
  
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          <Blurb body='Post what help you need here. Tutors will contact you.' />
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {cards.map(card => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <PostCard image='https://source.unsplash.com/random' 
                            title="Image title"
                            head='Heading' 
                            body='This is a media card. You can use this section to describe the content.' 
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        <Footer title='Posts footer' contents={ footerContents } />
      </React.Fragment>
    );
}

export default Album;