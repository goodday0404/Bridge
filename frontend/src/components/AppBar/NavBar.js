import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Create } from '@material-ui/icons'
import { Link, withRouter } from 'react-router-dom';
import { isAuth } from '../../Auth';

const buttonTextColor = ( history, to ) => {
    const isActivePage = history.location.pathname === to
    const color = isActivePage ? 'orange' : 'white'
    return { color }
} // buttonTextColor

const NavBarItem = props => {
    const { item, to, history } = props
    return( 
        <ListItem button component={Link} 
                  to={ to } 
                  style={ buttonTextColor( history, to ) } 
        >
            { item }
        </ListItem>
    ) // return
} // NavBarItem

const ItemBeforeLogin = props => {
    const { history } = props
    return (
        <List component="nav">
            <ListItem component="div">
                <NavBarItem item='SignUp' to='/signUp' history={ history } />
                <NavBarItem item='LogIn' to='/login' history={ history } />
            </ListItem>
        </List>
    ) // return
} //  ItemBeforeLogin

const ItemAfterLogin = props => {
    const { history } = props
    return (
        <List component="nav">
            <ListItem component="div">
                <NavBarItem item='ApplyTutor' to={ `/user/applyTutor/${ isAuth().user._id }` } history={ history }  />
                <NavBarItem item='Tutors' to='/tutors' history={ history } />
                <NavBarItem item='Members' to='/users' history={ history } />
                <NavBarItem item='Posts' to='/posts' history={ history } />
                <NavBarItem item={ <Create /> } to='/create' history={ history } />
            </ListItem>
        </List>
    ) // return
} //  ItemAfterLogin

const NavBar = props => {
    const { isAuth, history } = props
    return (
        isAuth ? <ItemAfterLogin history={ history } /> : 
                 <ItemBeforeLogin history={ history } />
    ) // return 
} // NavBar

//export default withRouter( NavBar );
export default NavBar;