import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextInputField from './TextInputField';
import Blurb from '../std/Blurb';
import Footer from '../std/Footer';
import useStyles from '../../styles/LoginFormStyle';
import AlertDiv from './alert';
import CircularIndeterminate from '../Loading/CircularIndicator';
import OutlinedTextField from '../std/OutlinedTextField';
import { CheckBox } from '../std/CheckBox';

const createForm = ( inputType, textLable, handler, focus=false, value=undefined ) => {
    return <TextInputField 
              inputType={ inputType } 
              textLabel={ textLable }
              onChange={ handler } 
              focus={ focus }
              value={ value }
          />
} // createForm

const SignupSuccess = ( bgColor, color ) => (
    <div className='alert' 
            style={ { backgroundColor: bgColor, 
                    color: color, 
                    textAlign: 'center', 
                    fontSize: 'large' } }>
        Signing Up success! { "  " } Please { " " }
        <Link to='/login' >
            log in here
        </Link>
    </div>
) // SignupSuccess

const SignupOption = () => (
    <Grid container>
        <Grid item>
            <Link to='/login' >
                {"Already have an account? Log In"}
            </Link>
        </Grid>
    </Grid>
) // SignupOption

const SignupForm = props => {
    const { error, isLoading, isSignUp, checked, formHandler, submitHandler, checkHandler, 
            password, enterKeyHandler } = props
    const classes = useStyles();

    return (
        <main>
            <Blurb body='Sign Up Here!' />
            <Grid container component="main" className={ classes.root }>
                <CssBaseline />
                <Grid item xs={ false } sm={ 4 } md={ 7 } className={ classes.image } />
                <Grid item xs={ 12 } sm={ 8 } md={ 5 } component={ Paper } elevation={ 6 } square>
                    <div className={ classes.paper }>
                        <Avatar className={ classes.avatar }>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography> 
                        { error && <AlertDiv msg={ error } bgColor='#F8BBD0' color='red' /> }
                        { isSignUp && SignupSuccess( 'palegreen', 'darkgreen' ) }
                        { isLoading && <CircularIndeterminate /> }
                        <div className={ classes.form } >
                            { createForm( 'name', 'Name', formHandler, true ) }
                            { createForm( 'email', 'Email Address', formHandler ) }
                            {/* { createForm( 'password', 'Password', formHandler ) } */}
                            { 
                                checked ?
                                createForm( 
                                    'password', 'Password', formHandler, false, password 
                                ) :

                                <OutlinedTextField
                                    label='Password'
                                    value={ password }
                                    onChange={ formHandler( 'password' ) }
                                    onKeyPress={ enterKeyHandler }
                                    style={ { display: 'flex', flexWrap: 'wrap' } }
                                    type='password'
                                    autoComplete='current-password'
                                />
                            }
                            <CheckBox 
                                label='Show password' 
                                checked={ checked } 
                                handler={ checkHandler } 
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={ classes.submit }
                                onClick={ submitHandler } 
                            >
                                Sign Up
                            </Button>
                            <SignupOption />
                        </div> 
                    </div>
                </Grid>
            </Grid>
            <Footer title='Login footer' contents='Add contents here' />
        </main>
  ) // return
} // SignupForm

export default SignupForm;