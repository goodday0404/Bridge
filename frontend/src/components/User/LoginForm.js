import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
//import Link from '@material-ui/core/Link';
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
import { CheckBox } from '../std/CheckBox';
import OutlinedTextField from '../std/OutlinedTextField';

const createForm = ( inputType, textLable, handler, focus=false, value=undefined ) => {
    return <TextInputField 
              inputType={ inputType } 
              textLabel={ textLable }
              onChange={ handler } 
              focus={ focus }
              value={ value }
          />
} // createForm

const LoginOption = () => (
    <Grid container>
        <Grid item xs>
        {/* <Link href="#" variant="body2"> */}
        <Link to='/#' >
            Forgot password?
        </Link>
        </Grid>
        <Grid item>
        {/* <Link href='/signUp' variant="body2"> */}
        <Link to='/signUp' >
            {"Don't have an account? Sign Up"}
        </Link>
        </Grid>
    </Grid>
) // LoginOption

const LoginForm = props => {
    const { error, isLoading, checked, formHandler, submitHandler, checkHandler,
            password, enterKeyHandler } = props
    const classes = useStyles();

    return (
        <main>
            <Blurb body='Login here!' />
            <Grid container component="main" className={ classes.root }>
                <CssBaseline />
                <Grid item xs={ false } sm={ 4 } md={ 7 } className={ classes.image } />
                <Grid item xs={ 12 } sm={ 8 } md={ 5 } component={ Paper } elevation={ 6 } square>
                    <div className={ classes.paper }>
                        <Avatar className={ classes.avatar }>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login in
                        </Typography>
                        { error && <AlertDiv msg={ error } bgColor='#F8BBD0' color='red' /> }
                        { isLoading && <CircularIndeterminate /> }
                        <div className={ classes.form } >
                            { createForm( 'email', 'Email Address', formHandler, true ) }
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
                                Log In
                            </Button>
                            <LoginOption />
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Footer title='Login footer' contents='Add contents here' />
        </main>
  ) // return
} // LoginForm

export default LoginForm;