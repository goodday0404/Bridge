import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';

import useStyles from '../../styles/LogInStyle';
import TextInputField from './TextInputField';
import LogInOptions from './LogInOptions';
import AlertDiv from './alert';
import SubmitButton from './SubmitButton';
import CircularIndeterminate from '../Loading/CircularIndicator';
import { logInProcess, validateJWT } from '../../Auth';

class LogIn extends Component {
    constructor() {
      super()
        this.initialState = {
            email: '',
            password: '',
            error: '',
            isLogIn: false,
            isLoading: false
        } // this.initialState
        this.state = this.initialState
        this.isLoading = false
    } // constructor

    componentDidMount() {
      if ( this.isLoading ) this.setState( { error: '', isLoading: true } )
    } // componentDidMount

    componentWillUnmount() {
      if ( !this.isLoading ) this.setState( { isLoading: false } )
    } // componentWillUnmount

    resetState() {
      this.setState( this.initialState )
    } // resetState

    startLoading() {
      //this.setState( { error: '', isLoading: true } )
      this.isLoading = true
    } // startLoading
  
    endLoading() {
      //this.setState( { isLoading: false } )
      this.isLoading = false
    } // endLoading

    // validateJWT( JWT ) {
    //   if ( typeof window === 'undefined' ) return
    //   // save Jason web token in app local storage
    //   localStorage.setItem( 'jwt', JSON.stringify( JWT ) )
    //   this.setState( { isLogIn: true } )
    // } // validateJWT

    handleInputEntered = key => event => {
      this.setState( { error: '' } ) // clear alert msg when entering new input
      this.setState( { [ key ]: event.target.value } )
    } // handleChange

    handleSubmit = event => {
      event.preventDefault() // prevent webbrowser from reloading
      this.setState( { isLoading: true } )
      //this.startLoading();
      const { email, password } = this.state
console.log({email, password})
      logInProcess( { email, password } ).then( data => {
console.log(data.error)
              if ( data.error ) this.setState( { error: data.error[0].msg, isLoading: false } ) 
              else validateJWT( data, () => this.setState( { isLogIn: true } ) )
              //this.endLoading();
      }) // then
    } // handleClick

    // logInProcess = async user => {
    //   const domain = 'http://localhost:8080/login'
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
    // } // doSignUp

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
      const { error, isLogIn, isLoading } = this.state
      return (
        isLogIn ? 
        <Redirect to="/" /> : // redirect to main page if user successes login.
        // otherwise display login page
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={useStyles.paper}>
            <Avatar className={useStyles.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5"> Log in </Typography>
            { error && this.alertSection( error, '#F8BBD0', 'red' ) }
            { isLoading && this.showLoadingIcon() }
            <form className={useStyles.form} noValidate>
              { this.createForm( 'email', 'Email Address', true ) }
              { this.createForm( 'password', 'Password' ) }
              <SubmitButton buttonName='Log In' onClick={ this.handleSubmit } />
              <LogInOptions />
            </form>
          </div>
        </Container>
      ) // return
    } // render 
} // LogIn

export default LogIn;