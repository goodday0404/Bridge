import React from 'react';
import Image from '../components/std/Image';
import Bridge from '../images/bridge.jpg';
import Blurb from '../components/std/Blurb';
import Footer from '../components/std/Footer';


const style = {
    // width: '100%', 
    height: '100%', 
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    objectFit: 'cover',
    //paddingTop: '30px',
    //paddingBottom: '30px',
} // style

const defaultImage = 'https://source.unsplash.com/random'

const wecomleTitle = 'Built for students'

const aboutBridge = 'Bridge is for students who want to give help or to get help\
                     for their studies. Volunteer to be a tutor and help other students or\
                     ask our tutors a question!'

const Home = () => (
      <main>
          <Blurb title={ wecomleTitle } body={ aboutBridge } both={ true } />
          <img className="card-img-top" 
              src={ Bridge } 
              alt='home'
              style={ style }
              onError={ image => { image.target.src = `${ defaultImage }` } } 
          />
          <Footer title='Home footer' contents={ 'add something here' } />
      </main>
      
    // <div className='jumbotron'>
    //     <h2>Home</h2>
    //     <p className='lead'>
    //         welcome to reat front end
    //     </p>
    // </div>
) // Home

// import React, { Component } from 'react'

// import UserProfile from 'react-user-profile'

// class Home extends Component {
//   render() {
//     const photo = 'https://api-cdn.spott.tv/rest/v004/image/images/e91f9cad-a70c-4f75-9db4-6508c37cd3c0?width=587&height=599'
//     const userName = 'Harvey Specter'
//     const location = 'New York, USA'

//     const comments = [
//       {
//         id: '1',
//         photo: 'https://api-cdn.spott.tv/rest/v004/image/images/e91f9cad-a70c-4f75-9db4-6508c37cd3c0?width=587&height=599',
//         userName: 'Mike Ross',
//         content: 'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. ',
//         createdAt: 1543858000000
//       }
//     ]

//     return (
//       <div style={{ margin: '0 auto', width: '100%' }}>
//         <UserProfile photo={photo} userName={userName} location={location} initialLikesCount={121} initialFollowingCount={723} initialFollowersCount={4433} initialComments={comments} />
//       </div>
//     )
//   }
// }


export default Home;
