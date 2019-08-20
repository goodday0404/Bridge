import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withRouter } from 'react-router-dom';
import { logOutProcess, isAuth } from '../../Auth';

const UserMenu = props => {
    const { anchorEl, open, handleClose, history } = props
    const logOut = () => {
        handleClose()
        logOutProcess( () => history.push( '/' ) )
    } // logOut
    const clickProfile = () => {
        history.push( `/user/${ isAuth().user._id }`)
        handleClose()
    } // clickProfile
    console.log('anchorEl in UserMenu: ', anchorEl)
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
            <MenuItem onClick={ clickProfile }> Profile </MenuItem>
            {/* <MenuItem onClick={ handleClose }> My account </MenuItem> */}
            <MenuItem onClick={ logOut }> Log out </MenuItem>
        </Menu>
    ) // return
} // UserMenu

export default withRouter( UserMenu );
