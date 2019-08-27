import React, { Component } from 'react';
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

// const Home = () => (
//       <main>
//           <Blurb title={ wecomleTitle } body={ aboutBridge } both={ true } />
//           <img className="card-img-top" 
//               src={ Bridge } 
//               alt='home'
//               style={ style }
//               onError={ image => { image.target.src = `${ defaultImage }` } } 
//           />
//           <Footer title='Home footer' contents={ 'add something here' } />
//       </main>
// ) // Home

class Home extends Component {

  componentDidMount() {
    window.scroll( 0, 0 )
  } // componentDidMount

  render() {
    return (
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
    ) // return
  } // render
} // Home

export default Home;
