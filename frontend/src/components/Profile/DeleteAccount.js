import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import { isAuth, logOutProcess, deleteUser } from '../../Auth';

class DeleteAccount extends Component {
    state = {
        route: false
    } // state

    handleDeleteAccount = () => {
        const alertMsg = 'Are you sure that you want to delete account? \
                          This action will delete your account permanently'
        let response = window.confirm( alertMsg )
        if ( !response ) return
        deleteUser( this.props.userId, isAuth().token )
        .then( data => {
            if ( data.error ) {
                console.log( data.error )
                return
            } // if
            logOutProcess( () => console.log( 'Account is deleted')) 
            this.setState( { route: true } )
        }) // then
    } // handleDeleteAccount
    render() {
        return (
            this.state.route ?
            <Redirect to='/' /> :

            // <button className='btn btn-raised btn-danger' 
            //         onClick={ this.handleDeleteAccount } >
            //     Delete  Account
            // </button>
            <Button variant="outlined" color="primary" onClick={ this.handleDeleteAccount }>
                Delete  Account
            </Button>
        )
    } // render
} // DeleteAccount

export default DeleteAccount;