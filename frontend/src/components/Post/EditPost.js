import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuth, path, getUserInfo, updateProcess, updateLocalJWT } from '../../Auth';
import { getPostRequest, updatePostRequest } from '../../API/postAPI';
import { InputField, FormButton } from '../std/Form';
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
        photo: '', 
        error: '',
        route: false,
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
        const { title, body, fileSize } = this.state
        if ( fileSize > this.maxFileSize ) {
          this.setState({ error: 'File size should be less than 100kb', isLoading: false })
          return false;
        } // if 

        if ( title.length === 0 ) {
          this.setState({ error: 'Title is required', isLoading: false });
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
          const { _id, title, body, error } = data
          if ( data.error ) this.setState( { isFailed: true } )
          else this.setState( { _id, title, body, error } )
        }) // then
      } // handleUserInfo

    handleInputEntered = key => event => {
        this.setState( { error: '' } ) // clear alert msg when entering new input
        let value = event.target.value;
        let size = 0
        if ( key === 'photo' && key !== undefined ) {
            value = event.target.files[0]
            size = value.size
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

    postForm = ( title, body, formStyle ) => {
        return (
            <div> 
                <OutlinedTextField
                    label='Title'
                    value={ title }
                    onChange={ this.handleInputEntered( 'title' ) }
                    style={ { ...formStyle, paddingTop: '100px' } }
                />
                { this.inputField( '', 'photo', 'file', '', 'image/*' ) }
                <OutlinedTextArea 
                    rows='20'
                    label='Body Context'
                    value={ body }
                    onChange={ this.handleInputEntered( 'body' ) }
                    style={ formStyle }
                />
                <FormButton label='Update post' onClick={ this.handleSubmit } /> 
            </div>
        ) // return
    } // postForm

    render() {
        const { title, body, route, isFailed, isLoading, error } = this.state
        const formStyle = { display: 'flex', flexWrap: 'wrap' }

        return (
            route ? <Redirect to='/posts' /> :

            <main>
                <Blurb body='Edit your post' />
                <div className='container'>
                    { isLoading && this.showLoadingIcon() }
                    { error && this.alertSection( error, '#F8BBD0', 'red' ) }
                    { this.postForm( title, body, formStyle ) }
                </div>
                <Footer title='Post footer' contents={ 'add something here' } />
            </main>
        ) // return
    } // render
} // EditPost

export default EditPost;

