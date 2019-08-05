import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';

//import SignUp from './user/SignUp';
import SignUp from './components/User/SignUp';
import LogIn from './components/User/LogIn';
import Post from './components/Post/Post';
import Tutor from './components/Tutor/Tutor';
import ButtonAppBar from './components/AppBar/Appbar';

const MainRouter = () => {
    return (
        <div>
            <ButtonAppBar />
            <Switch>
                <Route exact path='/signUp' component={SignUp} />
                <Route exact path='/login' component={LogIn} />
                <Route exact path='/posts' component={Post} />
                <Route exact path='/tutors' component={Tutor} />
                <Route exact path='/' component={Home} />
            </Switch>
        </div> 
    ) // return
} // MainRouter

export default MainRouter