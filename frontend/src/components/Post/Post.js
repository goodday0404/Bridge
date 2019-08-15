import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { path } from '../../Auth';
import { getPostRequest } from '../../API/postAPI';
import { getImage } from './index';
import Footer from '../std/Footer';
import Blurb from '../std/Blurb';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import PostCard from './PostCard';
import PostCardExpanded from './PostCardExpanded';

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: '100px', 
        paddingBottom: '100px',
    },
})) // useStyles

const PostContents = props => {
    const { post } = props
    const classes = useStyles();
    return (
        <main>
            {/* <Blurb body='something blar blar' /> */}
            <Container className={ classes.container } maxWidth="lg" >
                <PostCardExpanded post={ post } image={ getImage( post ) } />
            </Container>
            <Footer title='Post footer' contents={ 'Add contents here' } />
        </main>
    ) // return
} // PostContents


class Post extends Component {
    state ={
        post: ''
    } // state

    componentDidMount() {
        getPostRequest( this.props.match.params.postId ).then( data => {
            if ( data.error ) console.log( data.error )
            else this.setState( { post: data } )
        }) // then
    } // componentDidMount

    render() {
        const { post } = this.state
        return (
            <PostContents post={ post } />
          ) // return
    } // render
} // Post

export default Post;


// import React from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "material-ui/styles";
// import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
// import Button from "material-ui/Button";
// import ButtonBase from "material-ui/ButtonBase";
// import Typography from "material-ui/Typography";

// const styles = {
//   card: {
//     maxWidth: 345
//   },
//   cardButton: {
//     display: "block",
//     textAlign: "initial"
//   },
//   media: {
//     height: 200
//   }
// };

// function SimpleMediaCard(props) {
//   const { classes } = props;
//   return (
//     <div>
//       <Card className={classes.card}>
//         <ButtonBase className={classes.cardButton}>
//           <CardMedia
//             className={classes.media}
//             image="https://material-ui-next.com/static/images/cards/contemplative-reptile.jpg"
//             title="Contemplative Reptile"
//           />
//           <CardContent>
//             <Typography variant="headline" component="h2">
//               Lizard
//             </Typography>
//             <Typography component="p">
//               Lizards are a widespread group of squamate reptiles, with over
//               6,000 species, ranging across all continents except Antarctica
//             </Typography>
//           </CardContent>
//         </ButtonBase>
//         <CardActions>
//           <Button size="small" color="primary">
//             Share
//           </Button>
//           <Button size="small" color="primary">
//             Learn More
//           </Button>
//         </CardActions>
//       </Card>
//     </div>
//   );
// }

// SimpleMediaCard.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(SimpleMediaCard);

