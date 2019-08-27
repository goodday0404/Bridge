import React, { Component } from 'react';
import Header from '../std/Header';
import { Redirect } from 'react-router-dom';
import { isAuth, getUserInfo, updateProcess } from '../../Auth';
import { InputField, FormButton } from '../std/Form';
import AlertDiv from '../User/alert';
import CircularIndeterminate from '../Loading/CircularIndicator';
import Container from '@material-ui/core/Container';
import RadioButton from '../std/RadioButton';
import FormGroup from '@material-ui/core/FormGroup';
import OutlinedTextField from '../std/OutlinedTextField';
import SubmitButton from '../std/SubmitButton';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { School } from '@material-ui/icons'
import Footer from '../std/Footer';
import Blurb from '../std/Blurb';
import useStyles from '../../styles/PostCardExpandedStyle';

const Description = () => {
    const classes = useStyles()
    return (
        <Grid container justify="center" alignItems="center">
            <Avatar className={classes.schoolAvatar}>
                <School />
            </Avatar>
            <h4>Enter courses your are Interested in being tutor</h4>
        </Grid>
    ) // return
} // Description

class ApplyTutor extends Component {
    state = {
        user: '',
        tutor: 'yes',
        courses: '',
        route: false
    } // state

    getUserId() {
        return this.props.match.params.userId
    } // getUserId

    componentDidMount() {
        this.userData = new FormData()
        this.userData.set( 'tutor', 'yes' )
        this.handleUserInfo( this.props.match.params.userId )
    } // componentDidMount

    ///////////////////////////// widget handleters ///////////////////////////////

    handleUserInfo( userId ) {
        //const userId = this.props.match.params.userId
        //console.log( 'user id from route params: ', this.props.match.params.userId )
        getUserInfo( userId, isAuth().token )
        .then( data => {
          if ( data.error ) this.setState( { route: true } )
          else this.setState( { user: data } )
        }) // then
    } // handleUserInfo

    handleInputEntered = key => event => {
        //this.setState( { error: '' } ) // clear alert msg when entering new input
        this.userData.set( key, event.target.value )
        this.setState( { [ key ]: event.target.value } )
    } // handleChange

    handleSelectButton = event => {
        this.userData.set( 'tutor', event.target.value )
        this.setState({ tutor: event.target.value } )
    } // handleSelectButton

    handleTextInput = key => event => {
        this.userData.set( key, event.target.value )
        this.setState({ [ key ]: event.target.value } )
    } // handleTextInput

    handleSubmit = event => {
        event.preventDefault() // prevent webbrowser from reloading
        //if ( !this.isValidInput() ) return
// console.log('prpos: ', this.props)
// console.log('match: ', this.props.match)
// console.log('params: ', this.props.match.params)
// console.log('user id: ', this.getUserId())
        updateProcess( this.getUserId(), isAuth().token, this.userData )
        .then( data => {
                if ( data.error ) {
                    this.setState( { courses: '', error: data.error.error } ) 
                } else {
                    this.setState( { route: true } )
                } // if
        }) // then
    } // handleSubmit

    //////////////////////////////// rendering /////////////////////////////////////

    render() {
        const { tutor, route, user } = this.state
        const containerStyle = { 
            paddingTop: '50px', paddingBottom: '50px', textAligned: 'center',
            marginTop: '50px', marginBottom: '50px', backgroundColor: 'white',
        } // containerStyle
        const textFieldStyle = {
            display: 'flex', flexWrap: 'wrap', marginTop: '20px', marginBottom: '40px',
        } // textFieldStyle
        //const { _id, name, email, password , route, isLoading, error } = this.state
        return (
            route ? <Redirect to={ `/user/${ user._id }` } /> :
            <main>
                <Blurb body='Interested in becoming a tutor? Apply here!' />
                <Container style={ containerStyle } maxWidth="lg" >
                    {/* <h4> Do you want to be a tutor? </h4>
                    <RadioButton value={ tutor } onChange={ this.handleSelectButton } /> */}
                    {/* <div style={ descriptionStyle } >
                        Enter courses your are Interested in being tutor
                    </div> */}
                    <Description />
                    
                    <OutlinedTextField  
                        onChange={ this.handleTextInput( 'courses' ) }
                        label="Courses"
                        placeholder="Enter course codes, eg) CS493 CS494 MATH239"
                        helperText="Seperate course codes by space"
                        style={ textFieldStyle }
                     />
                    <SubmitButton buttonName='Submit' onClick={ this.handleSubmit } />
                    {/* { isLoading && this.showLoadingIcon() }
                    { error && this.alertSection( error, '#F8BBD0', 'red' ) }
                    { this.EditForm( name, email, password, '' ) } */}
                </Container>
                <Footer title='ApplyTutor footer' contents={ 'Add contents here' } />
            </main>
            
        ) // return
    } // render
} // ApplyTutor

export default ApplyTutor;