import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputBase from '@material-ui/core/InputBase'; // keep this to maintain search box format.

import useStyles from '../../styles/AppbarStyle';
import AppBarButtons from './AppBarButtons';
import SearchBox from './SearchBox';
import UserIcon from './UserIcon';
import NavBar from './NavBar';
import { withRouter } from 'react-router-dom';
import { isAuth } from '../../Auth';

// export const isAuth = () => {
//     if ( typeof window === 'undefined' ) return false
//     const item = localStorage.getItem( 'jwt' )
//     if ( item !== null ) return JSON.parse( item )
//     return false
// } // isAuth
 
const ButtonAppBar = props => {
    const classes = useStyles()
    const isLogin = isAuth()
    const [auth, setAuth] = React.useState( isLogin ? true : false )
    const [anchorEl, setAnchorEl] = React.useState( null )
    const open = Boolean(anchorEl)
    const { history } = props

    function handleChange(event) {
        setAuth(event.target.checked)
    } // handleChange

    function handleMenu(event) {
        setAnchorEl(event.currentTarget)
    } // handleChange

    function handleClose() {
        setAnchorEl(null);
    } // handleChange

// console.log('isLogin: ', isLogin)
// console.log('auth: ', auth)
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" 
                                className={classes.menuButton} 
                                color="inherit" 
                                aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Bridge
                    </Typography>
                    {/* { 
                        isLogin && 
                        <SearchBox 
                            search={classes.search} 
                            searchIcon={classes.searchIcon}
                            inputRoot={classes.inputRoot}
                            inputInput={classes.inputInput} 
                        />
                    } */}
                    {/* <AppBarButtons isLogin={isAuth} /> */}
                    <NavBar isAuth={ isLogin } history={ history } />
                    { 
                        isLogin && 
                        <UserIcon
                            handleMenu={handleMenu}
                            anchorEl={anchorEl}
                            open={open}
                            handleClose={handleClose}
                            userName={ isAuth().user.name }
                            
                        /> 
                    }
                </Toolbar>
            </AppBar>
        </div>
    ); // return
} // ButtonAppBar

export default withRouter( ButtonAppBar );