import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { isAuth, path } from '../../Auth';
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
    const { post, comments, commentHandler } = props
    const classes = useStyles();
    return (
        <main>
            {/* <Blurb body='something blar blar' /> */}
            <Container style={ { paddingTop: '100px', paddingBottom: '100px' } } maxWidth="lg" >
                <PostCardExpanded 
                    post={ post } 
                    image={ getImage( post ) }
                    comments={ comments }
                    commentHandler={ commentHandler } 
                />
            </Container>
            <Footer title='Post footer' contents={ 'Add contents here' } />
        </main>
    ) // return
} // PostContents


class Post extends Component {
    state ={
        post: '',
        comments: []
    } // state

    getUserImage( user ) {
        const date = new Date().getTime()
        return user ? path( `user/photo/${ user._id }?${ date }` ) : undefined
    } // getImage

    componentDidMount() {
        getPostRequest( this.props.match.params.postId ).then( data => {
            if ( data.error ) console.log( data.error )
            else this.setState( { post: data, comments: data.comments } )
        }) // then
    } // componentDidMount

    // comments: [
	// 	{
	// 		text: String,

	// 		created: {
	// 			type: Date,
	// 			default: Date.now
	// 		}, // created
			
	// 		postedBy: {
	// 			type: ObjectId,
	// 			ref: 'User'
	// 		} // postedBy
	// 	}
	// ] // comments

    // handleSubmitComment = ( event, value ) => {
    //     event.preventDefault();
    //     const commenter = isAuth().user
    //     const comment = {
    //     id: Math.floor(Math.random() * 100000).toString(),
    //     photo: this.getUserImage( commenter ),
    //         // 'https://api-cdn.spott.tv/rest/v004/image/images/e91f9cad-a70c-4f75-9db4-6508c37cd3c0?width=587&height=599',
    //     userName: commenter.name,
    //     content: value,
    //     createdAt: Date.now(),
    //     };
    //     this.setState(prevState => ({ comments: [...prevState.comments, comment] }));
    // } // handleSubmitComment

    render() {
        const { post, comments } = this.state
console.log('comments: ', comments)
        return (
            <PostContents 
                post={ post }
                comments={ comments } 
                commentHandler={ this.handleSubmitComment } 
            />
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

