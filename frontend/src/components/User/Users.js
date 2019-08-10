import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAllUserInfo } from '../../Auth';
import DefaultAvatar from '../../images/defaultAvatar.jpg';
import Header from  '../std/Header';
import Image from '../Profile/Image';
import Blurb from '../std/Blurb';
import Footer from '../std/Footer';
 
class Users extends Component {
    state = {
        users: []
    } // state

    componentDidMount() {
        getAllUserInfo().then( data => {
            if ( data.error ) console.log( data.error )
            else this.setState( { users: data  } )
        }) // then
    } // componentDidMount

    /////////////////////////////// rendering ////////////////////////////////////

    displayCards( users ) {
        return (
            <div className='row'>
                { users.map( ( user, i )  => (
                    <div className="card col-md-4" style={{ width: '18rem' }} key={ i }>
                        <Image name={ user.name } />
                        { this.cardBody( user ) }
                    </div> 
                    ) ) // map
                }
            </div>
        ) // return 
    } // displayCards

    cardBody( user ) {
        return (
            <div className="card-body">
                <h5 className="card-title"> { user.name } </h5>
                <p className="card-text">
                    { user.email }
                </p>
                <Link to={ `/user/${ user._id }` }
                      className='btn btn-raised btn-sm btn-primary' >
                          View Profile
                </Link>
                {/* <a href="#" className="btn btn-raised btn-sm btn-primary">
                    View Profile
                </a> */}
            </div>
        ) // return
    } // cardBody

    render() {
        const { users } = this.state
        return (
            <main>
                <Blurb body='Find your Tutor' />
                <div className='container'>            
                    { this.displayCards( users ) }
                </div>
                <Footer title='Tutor footer' contents='Add contents here' />
            </main> 
        ) // return
    } // render
} // User

export default Users;