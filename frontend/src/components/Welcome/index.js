import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from '../../styles/PostStyle';
import WelcomeImage from '../../images/welcome.jpg';
import Footer from '../std/Footer';


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

const Blurb = () => {
    const classes = useStyles()
    return (
        <div className={classes.heroContent}>
            <Container maxWidth="md">
                <Typography component="h4" variant="h3" align="center" color="textPrimary" gutterBottom>
                    Welcome to Bridge
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Please
                    <Link to='/login' > log in here </Link> { " " }
                    and update your profile in your Initial icon menu. { " " }
                    Introduce yourself to people!'
                </Typography>
            </Container>
        </div>
    ) // return
} // Blurb

// export const Welcome = () => (
//       <main>
//           <Blurb />
//           <img className="card-img-top" 
//               src={ WelcomeImage } 
//               alt='Welcome'
//               style={ style }
//               onError={ image => { image.target.src = `${ defaultImage }` } } 
//           />
//           <Footer title='Welcome footer' contents={ 'add something here' } />
//       </main>
// ) // Welcome

export class Welcome extends Component {

    componentDidMount() {
        window.scroll( 0, 0 )
    } // componentDidMount

    render() {
        return (
            <main>
                <Blurb />
                <img className="card-img-top" 
                    src={ WelcomeImage } 
                    alt='Welcome'
                    style={ style }
                    onError={ image => { image.target.src = `${ defaultImage }` } } 
                />
                <Footer title='Welcome footer' contents={ 'add something here' } />
            </main>
        ) // return
    } // render
} // Welcome

