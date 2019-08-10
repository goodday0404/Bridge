import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';

//import SignUp from './user/SignUp';
import SignUp from './components/User/SignUp';
import LogIn from './components/User/LogIn';
import Post from './components/Post/Post';
import Tutor from './components/Tutor/Tutor';
import Profile from './components/Profile/Profile';
import Users from './components/User/Users';
import EditUserProfile from './components/Profile/EditUserProfile';
import ApplyTutor from './components/Tutor/ApplyTutor';
import Posts from './components/Post/Posts';
import CreatePost from './components/Post/CreatePost';

const MainRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/signUp' component={ SignUp } />
                <Route exact path='/login' component={ LogIn } />
                <Route exact path='/posts' component={ Posts } />
                <Route exact path='/create' component={ CreatePost } />
                <Route exact path='/user/applyTutor/:userId' component={ ApplyTutor } />
                <Route exact path='/tutors' component={ Users } />
                {/* <Route exact path='/users' component={ Users } /> */}
                <Route exact path='/user/edit/:userId' component={ EditUserProfile } />
                <Route exact path='/user/:userId' component={ Profile } />
                <Route exact path='/' component={ Home } />
            </Switch>
        </div> 
    ) // return
} // MainRouter

export default MainRouter