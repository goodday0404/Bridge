import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Album from './Album';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class Posts extends Component {
    render() {
        return (
            <Album />
          ) // return
    } // render
} // Post

export default withRouter( Posts );






// import React, { Component } from "react";
// import { Grid, Paper, Typography } from "@material-ui/core";
// import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
// //import { posts } from "./dummy-posts";

// const posts = [

//     {
//      title: "My first post",
//      excerpt: "This is my first post with more content inside",
//      image: "https://bit.ly/2WNi2Ml"
//     },
   
//     {
//      title: "My second post",
//      excerpt: "This is my second post with more content inside",
//      image: "https://bit.ly/2WNi2Ml"
//     },
   
//     {
//      title: "My third post",
//      excerpt: "This is my third post with more content inside",
//      image: "https://bit.ly/2WNi2Ml"
//     },
   
//     {
//      title: "My fourth post",
//      excerpt: "This is my fourth post with more content inside",
//      image: "https://bit.ly/2WNi2Ml"
//     },
   
//     {
//      title: "My fifth post",
//      excerpt: "This is my fifth post with more content inside",
//      image: "https://bit.ly/2WNi2Ml"
//     },
   
//     {
//      title: "My sixth post",
//      excerpt: "This is my sixth post with more content inside",
//      image: "https://bit.ly/2WNi2Ml"
//     }
//    ]

// class Posts extends Component {
//     render() {
//         return (
//           <div style={{ marginTop: 20, padding: 30 }}>
//             <Grid container spacing={40} justify="center">
//               {posts.map(post => (
//                 <Grid item key={post.title}>
//                   <Card>
//                     <CardActionArea>
//                       <CardMedia
//                         component="img"
//                         alt="Contemplative Reptile"
//                         height="140"
//                         image={post.image}
//                         title="Contemplative Reptile"
//                       />
//                       <CardContent>
//                         <Typography gutterBottom variant="h5" component="h2">
//                           {post.title}
//                         </Typography>
//                         <Typography component="p">{post.excerpt}</Typography>
//                       </CardContent>
//                     </CardActionArea>
//                     <CardActions>
//                       <Button size="small" color="primary">
//                         Share
//                       </Button>
//                       <Button size="small" color="primary">
//                         Learn More
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </div>
//         ) // return
//     } // render
// } // Posts

// export default Posts;