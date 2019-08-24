// import React from 'react';
// import Image from '../components/std/Image';
// import Bridge from '../images/bridge.jpg';
// import Blurb from '../components/std/Blurb';
// import Footer from '../components/std/Footer';


// const style = {
//     // width: '100%', 
//     height: '100%', 
//     display: 'block',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     width: '100%',
//     objectFit: 'cover',
//     //paddingTop: '30px',
//     //paddingBottom: '30px',
// } // style

// const defaultImage = 'https://source.unsplash.com/random'

// const wecomleTitle = 'Built for students'

// const aboutBridge = 'Bridge is for students who want to give help or to get help\
//                      for their studies. Volunteer to be a tutor and help other students or\
//                      ask our tutors a question!'

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
      
//     // <div className='jumbotron'>
//     //     <h2>Home</h2>
//     //     <p className='lead'>
//     //         welcome to reat front end
//     //     </p>
//     // </div>
// ) // Home



import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
 
import StarRatings from 'react-star-ratings';
 
class Home extends React.Component {
    state = {
        rating: 0
    }
    changeRating =  (newRating, name ) => {
      this.setState({
        rating: newRating
      });
    }
 
    render() {
      // rating = 2;
      return (
        <div>
            <StarRatings
                rating={this.state.rating}
                starRatedColor="yellow"
                starHoverColor='yellow'
                changeRating={this.changeRating}
                numberOfStars={6}
                name='rating'
            />
            <div></div>
            <StarRatings
                rating={this.state.rating}
                starDimension="20px"
                //starSpacing="5px"
                isAggregateRating={ true }
                starRatedColor="#ffff00"
                //changeRating={this.changeRating}
            />
      </div>
      );
    }
}


export default Home;
