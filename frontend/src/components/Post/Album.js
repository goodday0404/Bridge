import React from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../styles/PostStyle';
import PostCard from './PostCard'; 
import { path } from '../../Auth';

const getImage = user => {
  return path( `user/photo/${ user._id }` ) 
} // getImage
  
const Album = props => {
    const classes = useStyles();
    const footerContents = 'add something here'
    const { searched, call } = props
  
    return (
//       <React.Fragment>
//         <CssBaseline />
//         <main>
//           <Blurb  call={ call }
//                   searched= { searched } 
//                   body='Post what help you need here. Tutors will contact you.' 
//           />
//           <Container className={classes.cardGrid} maxWidth="md">
//             {/* <Search searched={ searched } call={ c => { call() } } /> */}
//             <Grid container spacing={4}>
//               {/* {cards.map(card => (
//                 <Grid item key={card} xs={12} sm={6} md={4}>
//                   <PostCard image='https://source.unsplash.com/random' 
//                             title="Image title"
//                             head='Heading' 
//                             body='This is a media card. You can use this section to describe the content.' 
//                   />
//                 </Grid>
//               ))} */}
//               { searched.map( user => {
// //console.log(`${user.name}'s description: ${user.description}`)
//                 return (
//                 <Grid item key={user.name} xs={12} sm={6} md={4}>
//                   <PostCard image={ getImage( user ) } 
//                             title="Image title"
//                             head={ user.name } 
//                             email={ user.email }
//                             body={ user.description }
//                             to={ `/user/${ user._id }` }
//                   />
//                 </Grid> )
//               })}
//             </Grid>
//           </Container>
//         </main>
//         <Footer title='Posts footer' contents={ footerContents } />
//       </React.Fragment>
        <Grid container spacing={4}>
               { searched.map( user => {
//console.log(`${user.name}'s description: ${user.description}`)
                return (
                <Grid item key={user.name} xs={12} sm={6} md={4}>
                  <PostCard image={ getImage( user ) } 
                            title="Image title"
                            head={ user.name } 
                            email={ user.email }
                            body={ user.description }
                            to={ `/user/${ user._id }` }
                  />
                </Grid> )
              })}
        </Grid>
    );
}

export default Album;
