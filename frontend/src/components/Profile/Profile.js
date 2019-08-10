import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { isAuth, path, getData, getUserInfo } from '../../Auth';
import Header from  '../std/Header';
import Image from './Image';
import DeleteAccount from './DeleteAccount';

class Profile extends Component {
    state = {
        user: '',
        route: false
    } // state

    isTutor = () => this.state.user.tutor === 'yes'

    handleUserInfo( userId ) {
      //const userId = this.props.match.params.userId
      //console.log( 'user id from route params: ', this.props.match.params.userId )
      getUserInfo( userId, isAuth().token )
      .then( data => {
        if ( data.error ) this.setState( { route: true } )
        else this.setState( { user: data } )
      }) // then
    } // handleUserInfo

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
        const { user, route } = this.state
        const logInUser = isAuth().user 
        return ( 
            route ? <Redirect to='/LogIn' /> :

            <div className='container'>
              <Header title='User Profile' />
              <div className='row'>
                <div className='col-md-6'>
                  <Image name={ user.name } />
                </div>

                <div className='col-md-6'>
                  <div className='lead mt-2'>
                      <p> Name: { user.name } </p>
                      <p> Email: { user.email } </p>
                      { this.isTutor() && <p> Tutor for: { user.courses } </p> }
                      {/* <p> { `Joined ${ new Date( this.state.user.created ).toDateString() }` } </p> */}
                  </div>
                  { this.isLogInUser( logInUser ) && 
                    
                    <div className='d-inline-block mt-5'>
                        <Link className='btn btn-raised btn-success mr-5' to={ `/user/edit/${ user._id }`}>
                          Edit  Profile
                        </Link>
                        <DeleteAccount userId={ user._id } />
                    </div>
                  }
                </div>
              </div>
                
            </div>
        ) // return
    } // render

    // render() {
    //     const user = isAuth().user
    //     //const photo = 'https://api-cdn.spott.tv/rest/v004/image/images/e91f9cad-a70c-4f75-9db4-6508c37cd3c0?width=587&height=599'
    //     // const userName = 'Harvey Specter'
    //     // const location = 'New York, USA'
    //     const photo = 'undefined'
    
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
    //           <UserProfile  photo={photo} 
    //                         userName={ user.name } 
    //                         location={ user.email } 
    //                         initialLikesCount={121} 
    //                         initialFollowingCount={723} 
    //                         initialFollowersCount={4433} 
    //                         initialComments={comments} 
    //           />
    //       </div>
    //     ) // return
    // } // render
} // UserProfile

export default Profile;


