import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { isAuth, path, getData, getUserInfo } from '../../Auth';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useStyles from '../../styles/PostStyle';
import Header from  '../std/Header';
import Image from '../std/Image';
import DeleteAccount from './DeleteAccount';
import Footer from '../std/Footer';
import Blurb from '../std/Blurb';
import { EditDeleteButtons, FollowUnFollowButtons } from './ProfileButtons';
import SubView from './SubView';
import ProfileLayout from './profileLayout';


class Profile extends Component {
    state = {
        user: { follows: [], followers: [] },
        comments: [],
        route: false,
        follow: false,
        showMyTutors: false,
        showMyStudents: false
    } // state

    isTutor = () => this.state.user.tutor === 'yes'

    isMyFollow = you => {
        const myInfo = isAuth();
console.log('myInfo: ', myInfo)
        const result = you.followers.find( follower => {
            return follower._id === myInfo.user._id
        }) // find
        return result
    } // isMyFollow

    getImage() {
        const { user } = this.state
        const date = new Date().getTime()
        return user ? path( `user/photo/${ user._id }?${ date }` ) : undefined
    } // getImage

    handleUserInfo( userId ) {
      //const userId = this.props.match.params.userId
      //console.log( 'user id from route params: ', this.props.match.params.userId )
      getUserInfo( userId, isAuth().token )
      .then( data => {
        if ( data.error ) {
            this.setState( { route: true } )
            return
        } // if
        let follow = this.isMyFollow( data )
console.log('follow?: ', follow)
console.log('comments: ', data.comments)
        this.setState( { user: data, comments: data.comments, follow } )
      }) // then
    } // handleUserInfo

    handleClickFollowUnfollow = apiRequest => {
        const { user, follow } = this.state
        const auth = isAuth()
        apiRequest( auth.user._id, auth.token, user._id )
        .then( data => {
            if ( data.error ) this.setState( { error: data.error } )
            else this.setState( { user: data, follow: !follow } )
        }) // then
    } // handleClickFollow

    handleShowMyTutor = () => {
        //this.setState( { showMyTutors: !this.state.showMyTutors } )
        const { showMyTutors, showMyStudents } = this.state
        if ( showMyTutors  && showMyStudents ) {

        } else if ( !showMyTutors  && showMyStudents ) {
            this.setState( { showMyTutors: !showMyTutors, showMyStudents: !showMyStudents } )
        } else if ( showMyTutors  && !showMyStudents ) {
            this.setState( { showMyTutors: !showMyTutors } )
        } else {
            this.setState( { showMyTutors: !showMyTutors } )
        }
    } // handleShowMyTutor

    handleShowMyStudents = () => {
        //this.setState( { showMyStudents: !this.state.showMyStudents } )
        const { showMyTutors, showMyStudents } = this.state
        if ( showMyTutors  && showMyStudents ) {

        } else if ( !showMyStudents  && showMyTutors ) {
            this.setState( { showMyStudents: !showMyStudents, showMyTutors: !showMyTutors } )
        } else if ( showMyStudents  && !showMyTutors ) {
            this.setState( { showMyStudents: !showMyStudents} )
        } else {
            this.setState( { showMyStudents: !showMyStudents } )
        }
    } // handleShowMyStudents

    // request new user data when FIRST TIME new user component is clicked
    componentDidMount() {
        this.handleUserInfo( this.props.match.params.userId )
        // const domain = `${ p(ath( 'user' ) }/${ userId }`
        // fetch( domain, getData( isAuth().token ) )
        // .then( response => response.json() )
        // .then( data => {
        //   if ( data.error ) console.log( 'Error' )
        //   else console.log( data )
        // })
    } // componentDidMount

    // receive new props value when click a component that render only different
    // information but uses CURRENT COMPONENT
    componentWillReceiveProps( props ) {
        this.handleUserInfo( props.match.params.userId )
    } // componentWillReceiveProps

    isLogInUser( logInUser ) {
      return logInUser && logInUser._id === this.state.user._id
    } // isLogInUser

    render() {
        const { user, route, follow, showMyTutors, showMyStudents } = this.state
        const logInUser = isAuth().user 
        const styleContainer = {
            paddingTop: '100px',
            paddingBottom: '100px'
        } // styleContainer
        const styleText = {
            paddingTop: '30px',
            paddingBottom: '30px'
        } // // styleContainer

        return ( 
            route ? <Redirect to='/LogIn' /> :

            <main>
                <Blurb body='Introduce yourself here!' />
                <Container style={ { paddingTop: '100px', paddingBottom: '100px' } } maxWidth="lg" >
                    
                    <ProfileLayout 
                        user={ user } 
                        image={ this.getImage() } 
                        follow={ follow }
                        isLogInUser={ this.isLogInUser( logInUser ) }
                        isTutor={ this.isTutor() }
                        showMyTutors={ showMyTutors }
                        showMyStudents={ showMyStudents }
                        followHandler={ this.handleClickFollowUnfollow }
                        handleShowMyTutor={ this.handleShowMyTutor }
                        handleShowMyStudents={ this.handleShowMyStudents }
                    />
                </Container>


                {/* <Container style={ styleContainer } maxWidth="md">
                    <Image url={ this.getImage() } name={ user.name } />
                    <Typography style={ styleText } gutterBottom variant="h5" component="h2" align='center' color="textPrimary">
                        Name: {"  "}  { user.name }
                    </Typography>
                    <Typography style={ styleText } gutterBottom variant="h5" component="h2" align='center' color="textPrimary">
                        Email:  {"  "}  { user.email }
                    </Typography>
                    <Typography style={ styleText } gutterBottom variant="h5" component="h2" align='center' color="textPrimary">
                        Program: {"  "}  { user.program }
                    </Typography>
                    { 
                      this.isTutor() && 
                      <Typography style={ styleText } gutterBottom variant="h5" component="h2" align='center' color="textPrimary">
                          Tutor for: {"  "}  { user.courses }
                      </Typography>
                    }
                    <Typography style={ styleText } gutterBottom variant="h5" component="h2" align='center' color="textPrimary">
                        About me: <br/><br/> { user.description }
                    </Typography>
                    {
                      this.isLogInUser( logInUser ) ?
                      <EditDeleteButtons  userId={ user._id } /> :
                      <FollowUnFollowButtons follow={ follow } 
                                             clickHandler={this.handleClickFollowUnfollow }  
                      />
                      // <div style={ { marginTop: '20px' } }>
                      //     <Grid container spacing={2} justify="center">
                      //     <Grid item>
                      //         <Link to={ `/user/edit/${ user._id }`}>
                      //           <Button variant="contained" color="primary">
                      //               Edit  Profile
                      //           </Button>
                      //         </Link>
                      //     </Grid>
                      //     <Grid item>
                      //       <DeleteAccount userId={ user._id } />
                      //     </Grid>
                      //     </Grid>
                      // </div> 
                    }
                    <SubView follows={ user.follows } followers={ user.followers } />
                </Container> */}
                <Footer title='CreatePost footer' contents={ 'Add contents here' } />
            </main>
        ) // return
    } // render
} // UserProfile








// class Profile extends Component {
//     state = {
//         user: { follows: [], followers: [] },
//         route: false,
//         follow: false
//     } // state

//     isTutor = () => this.state.user.tutor === 'yes'

//     isMyFollow = you => {
//         const myInfo = isAuth();
// console.log('myInfo: ', myInfo)
//         const result = you.followers.find( follower => {
//             return follower._id === myInfo.user._id
//         }) // find
//         return result
//     } // isMyFollow

//     getImage() {
//         const { user } = this.state
//         const date = new Date().getTime()
//         return user ? path( `user/photo/${ user._id }?${ date }` ) : undefined
//     } // getImage

//     handleUserInfo( userId ) {
//       //const userId = this.props.match.params.userId
//       //console.log( 'user id from route params: ', this.props.match.params.userId )
//       getUserInfo( userId, isAuth().token )
//       .then( data => {
//         if ( data.error ) {
//             this.setState( { route: true } )
//             return
//         } // if
//         let follow = this.isMyFollow( data )
// console.log('follow?: ', follow)
//         this.setState( { user: data, follow } )
//       }) // then
//     } // handleUserInfo

//     handleClickFollowUnfollow = apiRequest => {
//         const { user, follow } = this.state
//         const auth = isAuth()
//         apiRequest( auth.user._id, auth.token, user._id )
//         .then( data => {
//             if ( data.error ) this.setState( { error: data.error } )
//             else this.setState( { user: data, follow: !follow } )
//         }) // then
//     } // handleClickFollow

//     // request new user data when FIRST TIME new user component is clicked
//     componentDidMount() {
//         this.handleUserInfo( this.props.match.params.userId )
//         // const domain = `${ p(ath( 'user' ) }/${ userId }`
//         // fetch( domain, getData( isAuth().token ) )
//         // .then( response => response.json() )
//         // .then( data => {
//         //   if ( data.error ) console.log( 'Error' )
//         //   else console.log( data )
//         // })
//     } // componentDidMount

//     // receive new props value when click a component that render only different
//     // information but uses CURRENT COMPONENT
//     componentWillReceiveProps( props ) {
//         this.handleUserInfo( props.match.params.userId )
//     } // componentWillReceiveProps

//     isLogInUser( logInUser ) {
//       return logInUser && logInUser._id === this.state.user._id
//     } // isLogInUser

//     render() {
//         const { user, route, follow } = this.state
//         const logInUser = isAuth().user 
//         const styleContainer = {
//             paddingTop: '100px',
//             paddingBottom: '100px'
//         } // styleContainer
//         const styleText = {
//             paddingTop: '30px',
//             paddingBottom: '30px'
//         } // // styleContainer

//         return ( 
//             route ? <Redirect to='/LogIn' /> :

//             <main>
//                 <Blurb title='Profile' />
//                 <Container style={ styleContainer } maxWidth="md">
//                     <Image url={ this.getImage() } name={ user.name } />
//                     <Typography style={ styleText } gutterBottom variant="h5" component="h2" align='center' color="textPrimary">
//                         Name: {"  "}  { user.name }
//                     </Typography>
//                     <Typography style={ styleText } gutterBottom variant="h5" component="h2" align='center' color="textPrimary">
//                         Email:  {"  "}  { user.email }
//                     </Typography>
//                     <Typography style={ styleText } gutterBottom variant="h5" component="h2" align='center' color="textPrimary">
//                         Program: {"  "}  { user.program }
//                     </Typography>
//                     { 
//                       this.isTutor() && 
//                       <Typography style={ styleText } gutterBottom variant="h5" component="h2" align='center' color="textPrimary">
//                           Tutor for: {"  "}  { user.courses }
//                       </Typography>
//                     }
//                     <Typography style={ styleText } gutterBottom variant="h5" component="h2" align='center' color="textPrimary">
//                         About me: <br/><br/> { user.description }
//                     </Typography>
//                     {
//                       this.isLogInUser( logInUser ) ?
//                       <EditDeleteButtons  userId={ user._id } /> :
//                       <FollowUnFollowButtons follow={ follow } 
//                                              clickHandler={this.handleClickFollowUnfollow }  
//                       />
//                       // <div style={ { marginTop: '20px' } }>
//                       //     <Grid container spacing={2} justify="center">
//                       //     <Grid item>
//                       //         <Link to={ `/user/edit/${ user._id }`}>
//                       //           <Button variant="contained" color="primary">
//                       //               Edit  Profile
//                       //           </Button>
//                       //         </Link>
//                       //     </Grid>
//                       //     <Grid item>
//                       //       <DeleteAccount userId={ user._id } />
//                       //     </Grid>
//                       //     </Grid>
//                       // </div> 
//                     }
//                     <SubView follows={ user.follows } followers={ user.followers } />
//                 </Container>
//                 <Footer title='CreatePost footer' contents={ 'Add contents here' } />
//             </main>
//         ) // return
//     } // render
// } // UserProfile

export default Profile;


