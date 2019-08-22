import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar'; // keep this for icon color

import useStyles from '../../styles/SignUpStyle';
import LockOnIcon from './LockOnIcon';
import FormTitle from './FormTtile';
import TextInputField from './TextInputField';
import { Option } from './LogInOptions';
import SubmitButton from '../std/SubmitButton';
import AlertDiv from './alert';
import CircularIndeterminate from '../Loading/CircularIndicator';
import { signUpProcess } from '../../Auth';
import SignupForm from './SignupForm';
import Blurb from '../std/Blurb';
import Footer from '../std/Footer';

class SignUp extends Component {
  constructor() {
    super()
      this.initialState = {
          name: "",
          password: '',
          email: '',
          error: '',
          isSignUp: false,
          isLoading: false,
          checked: false,
          tutor: 'no',
          courses: '',
          program: ''
      } // this.initialState
      this.state = this.initialState
  } // constructor

  resetState() {
    this.setState( this.initialState )
  } // resetState

  // startLoading() {
  //   this.setState( { error: '', isLoading: true } )
  // } // startLoading

  // endLoading() {
  //   this.setState( { isLoading: false } )
  // } // endLoading

  handleInputEntered = key => event => {
    this.setState( { error: "", isSignUp: false } ) // clear alert msg when entering new input
    this.setState( { [ key ]: event.target.value } )
  } // handleChange

  handleSubmit = event => {
    event.preventDefault() // prevent webbrowser from reloading
    //this.startLoading();
    this.setState( { isLoading: true } )
    const { name, email, password, tutor, courses, program } = this.state
    signUpProcess( { name, email, password, tutor, courses, program } ).then( data => {
            if ( data.error ) {
              this.setState( { error: data.error[0].msg, isLoading: false } ) 
            } else {
              this.resetState()
              this.setState( { isSignUp: true } )
            } // if
            //this.endLoading();
    }) // then
  } // handleClick

  handleCheck = key => event => {
    this.setState( { [ key ]: event.target.checked } )
  } // handleCheck

  // signUpProcess = async user => {
  //   const domain = 'http://localhost:8080/signup'
  //   const data = {
  //       method: 'POST',
  //       headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json'
  //       }, // headers
  //       body: JSON.stringify( user )
  //   } // data
  //   try {
  //       const response = await fetch(domain, data);
  //       return await response.json({ message: 'data fetch success!' });
  //   } catch ( error ) {
  //       return console.log(error);
  //   } // catch
  // } // signUpProcess

  ////////////////////////////////// rendering /////////////////////////////////////
  
  alertSection( msg, bgColor, color ) {
    return <AlertDiv msg={ msg } bgColor={ bgColor } color={ color } />
  } // alertSection

  createForm( inputType, textLable, focus=false ) {
    return <TextInputField 
              inputType={ inputType } 
              textLabel={ textLable }
              onChange={ this.handleInputEntered } 
              focus={ focus }
          />
  } // createForm

  showLoadingIcon() {
    return <CircularIndeterminate />
  } // showLoadingIcon

  render() {
    const { error, isSignUp, isLoading, checked, password } = this.state
    const loginMsg = 'Please login'
    return (
        isSignUp ?  <Redirect to='/welcome' /> :

                    <SignupForm 
                          error={ error }
                          password={ password }
                          isLoading={ isLoading }
                          isSignUp={ isSignUp }
                          checked={ checked }
                          formHandler={ this.handleInputEntered } 
                          submitHandler={ this.handleSubmit }
                          checkHandler={ this.handleCheck }
                    />
      // <main>
      //   <Blurb body='Sign Up here!' />
      //   <Container component="main" maxWidth="xs">
      //     <CssBaseline />
      //     <div className={useStyles.paper}>
      //       <LockOnIcon />
      //       <FormTitle title='Sign up' />
      //       { isLoading && this.showLoadingIcon() }
      //       { error && this.alertSection( error, '#F8BBD0', 'red' ) }
      //       { isSignUp && this.alertSection( loginMsg, 'palegreen', 'darkgreen' ) }
      //       <form className={useStyles.form} noValidate>
      //         <Grid container spacing={2}>
      //           { this.createForm( 'name', 'Name', true ) }
      //           { this.createForm( 'email', 'Email Address' ) }
      //           { this.createForm( 'password', 'Password' ) }
      //           <Grid item xs={12}></Grid>
      //         </Grid>
      //         <SubmitButton buttonName='Sign Up' onClick={ this.handleSubmit } />
      //         <Grid container justify="flex-end">
      //           <Option msg="Already have an account? Sign in" />
      //         </Grid>
      //       </form>
      //     </div>
      //   </Container>
      //   <Footer title='SignUp footer' contents='Add contents here' />
      // </main>
    ) // return
  } // render
} // SignUp

export default SignUp;