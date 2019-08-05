import React from 'react';
import Button from '@material-ui/core/Button';

const ButtonsAfterLogin = () => {
    const createIcon = ( <i class="material-icons">create</i> )
    return (
        <div className='AppBarButtons'>
            <Button color="inherit"> Tutor </Button>
            <Button color="inherit"> Post </Button>
            <Button color="inherit"> { createIcon } </Button>
        </div>
    ) // return
} // ButtonsAfterLogin

const ButtonsBeforeLogin = () => {
    return(
        <div>
            <Button color="inherit">Signin</Button>
            <Button color="inherit">Login</Button>
        </div>
    ) // return
} // ButtonsBeforeLogin

const AppBarButtons = props => {
    return(
        props.isLogin ? <ButtonsAfterLogin /> : <ButtonsBeforeLogin />
    ) // return 
} // AppBarButtons

export default AppBarButtons;