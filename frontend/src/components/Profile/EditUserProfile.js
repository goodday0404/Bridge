import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from  '../std/Header';
import { isAuth, getUserInfo, updateProcess } from '../../Auth';
import { InputField, FormButton } from '../std/Form';
import AlertDiv from '../User/alert';
import CircularIndeterminate from '../Loading/CircularIndicator';

class EditUserProfile extends Component {
    state = {
        _id: '',
        name: '',
        email: '',
        password: '',
        route: '',
        isLoading: false,
        fileSize: '',
        error: '',
        tutor: 'no',
        courses: '',
        fileSize: 0
    } // state

    resetState() {
        this.setState( this.initialState )
      } // resetState
    
    startLoading() {
        this.isLoading = true
    } // startLoading
    
    endLoading() {
        this.isLoading = false
    } // endLoading

    getUserId() {
        return this.props.match.params.userId
    } // getUserId

    isValidEmail( email ) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    } // isValidEmail

    isValidPassword( password ) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/
    } // isValidPassword

    isValidInput = () => {
        const { name, email, password, fileSize } = this.state
        if ( fileSize > this.maxFileSize ) {
          this.setState({ error: 'File size should be less than 100kb', isLoading: false })
          return false;
        } // if 

        if ( name.length === 0 ) {
          this.setState({ error: 'Name is required', isLoading: false });
          return false;
        } // if
        
        if ( !this.isValidEmail( email ) ) {
          this.setState({ error: 'A valid Email is required', isLoading: false });
          return false;
        } // if

        if ( password.length < 6 ) {
          this.setState({ error: 'Password must be at least 6 characters long', isLoading: false });
          return false;
        } // if

        if ( !this.isValidPassword( password ) ) {
            this.setState( {
                error: 'Password must include one lowercase character, \
                       one uppercase character, a number, and a special character.',
                isLoading: false
            }) // setState
        } // if
        return true
    } // isValidInput

    /////////////////////////// Life cycle methods //////////////////////////

    componentDidMount() {
        if ( this.isLoading ) this.setState( { error: '', isLoading: true } )
        this.userData = new FormData()
        this.maxFileSize = 1000000
        this.handleUserInfo( this.getUserId() )
    } // componentDidMount
      
    componentWillUnmount() {
        if ( !this.isLoading ) this.setState( { isLoading: false } )
    } // componentWillUnmount

    //////////////////////////// Event handlers /////////////////////////////////

    handleInputEntered = key => event => {
        this.setState( { error: '' } ) // clear alert msg when entering new input
        let value = event.target.value;
        let size = 0
        if ( key === 'photo' ) {
            value = event.target.files[0]
            size = value.size
        } // if
        this.userData.set( key, value )
        this.setState( { [ key ]: value, fileSize: size } )
    } // handleChange

    handleSubmit = event => {
        event.preventDefault() // prevent webbrowser from reloading
        if ( !this.isValidInput() ) return
        updateProcess( this.getUserId(), isAuth().token, this.userData )
        .then( data => {
                if ( data.error ) {
                    this.setState( { error: data.error.error } ) 
                } else {
                    this.setState( { route: true } )
                } // if
        }) // then
    } // handleSubmit

    handleUserInfo( userId ) {
        getUserInfo( userId, isAuth().token )
        .then( data => {
          const { _id, name, email, tutor, courses } = data
          if ( data.error ) this.setState( { route: true } )
          else this.setState( { _id, name, email, tutor, courses } )
        }) // then
      } // handleUserInfo

    //////////////////////////////// rendering /////////////////////////////////////

    alertSection( msg, bgColor, color ) {
        return <AlertDiv msg={ msg } bgColor={ bgColor } color={ color } />
    } // alertSection

    showLoadingIcon() {
        return <CircularIndeterminate />
    } // showLoadingIcon

    inputField( label, context, type, value, accept ) {
        return <InputField  label={ label } 
                            type={ type } 
                            accept={ accept }
                            value={ value }
                            onChange={ this.handleInputEntered( context ) }
               />
    } // inputField

    EditForm = ( name, email, password, about, tutor, courses ) => (
        <form> 
            { this.inputField( 'Photo', 'photo', 'file', '', 'image/*' ) }
            { this.inputField( 'Name', 'name', 'text', name ) }
            { this.inputField( 'Email', 'email', 'text', email ) }
            { this.inputField( 'About', 'about', 'text', about ) }
            { this.inputField( 'Tutor', 'tutor', 'text', tutor ) }
            { this.inputField( 'Courses', 'courses', 'text', courses ) }
            { this.inputField( 'Password', 'password', 'text', password ) }
            <FormButton label='Update' onClick={ this.handleSubmit } /> 
        </form>
      );

    render() {
        const { _id, name, email, password , route, isLoading, error, tutor, courses } = this.state
        return (
            route ? <Redirect to={ `/user/${ _id }` } /> :

            <div className='container'>
                <Header title='Edit User Profile' />
                { isLoading && this.showLoadingIcon() }
                { error && this.alertSection( error, '#F8BBD0', 'red' ) }
                { this.EditForm( name, email, password, '', tutor, courses ) }
            </div>
        ) // return
    } // render
} // EditUserProfile

export default EditUserProfile;