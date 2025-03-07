import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { isAuth, path, getUserInfo, updateProcess, updateLocalJWT } from '../../Auth';
import { getPostRequest, updatePostRequest } from '../../API/postAPI';
import { getImage } from './index';
import { InputField, FormButton, FormButtons } from '../std/Form';
import { containerStyle } from './index';
import AlertDiv from '../User/alert';
import CircularIndeterminate from '../Loading/CircularIndicator';
import Image from '../std/Image';
import OutlinedTextField from '../std/OutlinedTextField';
import OutlinedTextArea from '../std/OutlinedTextArea';
import Blurb from '../std/Blurb';
import Footer from '../std/Footer';

class EditPost extends Component {
    state = {
        _id: '',
        title: '',
        body: '',
        place: '',
        hours: '',
        photo: '', 
        currentPhoto: undefined,
        error: '',
        route: false,
        isCancel: false,
        isFailed: false,
        isLoading: false,
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

    getPostId() {
        return this.props.match.params.postId
    } // getUserId

    // getImage() {
    //     const { _id } = this.state
    //     const date = new Date().getTime()
    //     return _id ? path( `user/photo/${ _id }?${ date }` ) : undefined
    // } // getImage

    isValidInput = () => {
        const { title, place, hours, body, fileSize } = this.state
        if ( fileSize > this.maxFileSize ) {
          this.setState({ error: 'File size should be less than 100kb', isLoading: false })
          return false;
        } // if 

        if ( title.length === 0 ) {
          this.setState({ error: 'Title is required', isLoading: false });
          return false;
        } // if

        if ( place.length === 0 ) {
            this.setState({ error: 'Place is required', isLoading: false });
            return false;
        } // if

        if ( hours.length === 0 ) {
        this.setState({ error: 'Hours is required', isLoading: false });
        return false;
        } // if
        
        if ( body.length === 0 ) {
            this.setState({ error: 'Body contents is required', isLoading: false });
            return false;
          } // if
        return true
    } // isValidInput

    /////////////////////////// Life cycle methods //////////////////////////

    componentDidMount() {
        if ( this.isLoading ) this.setState( { error: '', isLoading: true } )
        this.postData = new FormData()
        this.maxFileSize = 1000000
        this.handlePostInfo( this.getPostId() )
    } // componentDidMount
      
    componentWillUnmount() {
        if ( !this.isLoading ) this.setState( { isLoading: false } )
    } // componentWillUnmount

    //////////////////////////// Event handlers /////////////////////////////////

    handlePostInfo( postId ) {
        getPostRequest( postId )
        .then( data => {
          const { _id, title, place, hours, body, error } = data
          const currentPhoto = data.photo ? getImage( data ) : undefined
          if ( data.error ) this.setState( { isFailed: true } )
          else this.setState( { _id, title, place, hours, body, error, currentPhoto } )
        }) // then
      } // handleUserInfo

    handleInputEntered = key => event => {
        this.setState( { error: '' } ) // clear alert msg when entering new input
        let value = event.target.value;
        let size = 0
        if ( key === 'photo' ) {
            value = event.target.files[0]
            if ( value ) size = value.size
        } // if
        this.postData.set( key, value )
        this.setState( { [ key ]: value, fileSize: size } )
    } // handleChange

    handleSubmit = event => {
        event.preventDefault() // prevent webbrowser from reloading
        if ( !this.isValidInput() ) return
        this.startLoading()
        const auth = isAuth()
        updatePostRequest( this.state._id, auth.token, this.postData )
        .then( data => {
                if ( data.error ) {
                    this.setState( { error: data.error.error } ) 
                    return
                } // if
                console.log('New post: ', data)
                this.endLoading()
                this.setState( { route: true } )
        }) // then
    } // handleSubmit

    cancelButtonHandler = () => {
        this.setState( { isCancel: true } )
    } // cancelButtonHandler

    //////////////////////////////// rendering /////////////////////////////////////

    alertSection( msg, bgColor, color ) {
        return <AlertDiv msg={ msg } bgColor={ bgColor } color={ color } />
    } // alertSection

    showLoadingIcon() {
        return <CircularIndeterminate />
    } // showLoadingIcon

    inputField( label, context, type, value, accept, textarea ) {
        return <InputField  label={ label } 
                            type={ type } 
                            accept={ accept }
                            value={ value }
                            textarea={ textarea }
                            onChange={ this.handleInputEntered( context ) }
               />
    } // inputField

    outLinedInputField( label, key, value, style ) {
        return <OutlinedTextField
                    label={ label }
                    value={ value }
                    onChange={ this.handleInputEntered( key ) }
                    style={ style }
                />
    } // outLinedInputField

    postForm = ( title, place, hours, body, formStyle ) => {
        const { post, photo, currentPhoto } = this.state
        const newPhoto = photo ? URL.createObjectURL( photo ) : currentPhoto
        return (
            <div> 
                {/* <OutlinedTextField
                    label='Title'
                    value={ title }
                    onChange={ this.handleInputEntered( 'title' ) }
                    style={ { ...formStyle, marginTop: '30px' } }
                /> */}
                { this.outLinedInputField( 
                    'Title', 'title', title, { ...formStyle, marginTop: '30px' } 
                ) }
                { newPhoto && <Image url={ newPhoto } alt='newPhoto' /> }
                { this.inputField( '', 'photo', 'file', '', 'image/*' ) }
                { this.outLinedInputField( 'Preferred place', 'place', place, formStyle ) }
                { this.outLinedInputField( 'Preferred hours', 'hours', hours, formStyle ) }
                <OutlinedTextArea 
                    rows='20'
                    label='Body Context'
                    value={ body }
                    onChange={ this.handleInputEntered( 'body' ) }
                    style={ formStyle }
                />
                <FormButtons 
                    leftLabel='Update'
                    rightLabel='Cancel'
                    leftButtonHandler={ this.handleSubmit }
                    rightButtonHandler={ this.cancelButtonHandler }
                /> 
                {/* <FormButton label='Update post' onClick={ this.handleSubmit } />  */}
            </div>
        ) // return
    } // postForm

    render() {
        const { _id, title, place, hours, body, route, isCancel, isFailed, isLoading, 
                error } = this.state
        const formStyle = { display: 'flex', flexWrap: 'wrap' }

        return (
            // route ? <Redirect to='/posts' /> :

            route || isCancel ? <Redirect to={ `/posts/open/${ _id }` } /> :

            <main>
                <Blurb body='Edit your post' />
                <Container style={ containerStyle } maxWidth="lg" >
                    { isLoading && this.showLoadingIcon() }
                    { error && this.alertSection( error, '#F8BBD0', 'red' ) }
                    { this.postForm( title, place, hours, body, formStyle ) }
                </Container>
                <Footer title='Post footer' contents={ 'add something here' } />
            </main>
        ) // return
    } // render
} // EditPost

export default EditPost;

