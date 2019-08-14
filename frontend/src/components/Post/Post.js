import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Footer from '../std/Footer';
import Blurb from '../std/Blurb';

class Post extends Component {
    render() {
        const containerStyle = { paddingTop: '100px', paddingBottom: '100px' }
        
        return (
            <main>
                <Blurb body='something blar blar' />
                <Container style={ containerStyle } maxWidth="md">
                    <h4> Implement displaying a post </h4>
                </Container>
                <Footer title='Post footer' contents={ 'Add contents here' } />
            </main>
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

