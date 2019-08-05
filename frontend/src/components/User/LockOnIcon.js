import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from '../../styles/SignUpStyle';

const LockOnIcon = () => {
    return (
        <Avatar className={useStyles().avatar}>
            <LockOutlinedIcon />
        </Avatar>
    ) // return 
} // LockOnIcon

export default LockOnIcon;