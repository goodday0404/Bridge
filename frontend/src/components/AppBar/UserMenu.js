import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withRouter } from 'react-router-dom';
import { logOutProcess } from '../../Auth';

// export const logOutProcess = async call => {
//     if ( typeof window !== 'undefined' ) localStorage.removeItem( 'jwt' )
//     //history.push( '/' )
//     call()
//     const domain = 'http://localhost:8080/logOut'
//     const data = { method: 'GET' }
//     try {
//         const response = await fetch( domain, data );
//         return await response.json( { msg: 'Logged out successully!' } );
//     } catch ( error ) {
//         return console.log( error );
//     } // catch
// } // logOut

const UserMenu = props => {
    const { anchorEl, open, handleClose, history } = props
    const logOut = () => logOutProcess( () => history.push( '/' ) )
    return (
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={ logOut }> Log out </MenuItem>
        </Menu>
    ) // return
} // UserMenu

export default withRouter( UserMenu );
