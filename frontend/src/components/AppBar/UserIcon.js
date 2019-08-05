import React from 'react';
import UserMenu from './UserMenu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import LetterAvatars from './LetterAvatar';

const userInitial = userName => {
    const splited = userName.split( ' ' )
    return splited[0][0].concat( splited[1][0] )
} // userInitial

const UserIcon = props => {
    const { handleMenu, anchorEl, open, handleClose, userName } = props
    return (
        <div>
            <IconButton
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                { userName ? <LetterAvatars initial={ userInitial( userName ) } /> : 
                             <AccountCircle /> }
            </IconButton>
            <UserMenu 
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
            />
        </div>
    ) // return
} // UserIcon

export default UserIcon;