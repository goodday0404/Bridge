import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from  '../std/Header';
import { isAuth, path, getUserInfo, updateProcess, updateLocalJWT } from '../../Auth';
import { postRequest } from '../../API/postAPI';
import { InputField, FormButton, FormButtons } from '../std/Form';
import AlertDiv from '../User/alert';
import CircularIndeterminate from '../Loading/CircularIndicator';
import Image from '../std/Image';
import OutlinedTextField from '../std/OutlinedTextField';
import OutlinedTextArea from '../std/OutlinedTextArea';
import Blurb from '../std/Blurb';
import Footer from '../std/Footer';

class CreatePost extends Component {
    state = {
        user: {},
        title: '',
        body: '',
        photo: '', 
        currentPhoto: undefined,
        error: '',
        route: '',
        isLoading: false,
        isCancel: false,
        fileSize: 0,
        place: '',
        hours: ''
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

    // getUserId() {
    //     return this.props.match.params.userId
    // } // getUserId

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
        this.setState( { user: isAuth().user } )
    } // componentDidMount
      
    componentWillUnmount() {
        if ( !this.isLoading ) this.setState( { isLoading: false } )
    } // componentWillUnmount

    // componentWillReceiveProps( props ) {
    //     this.handleUserInfo( props.match.params.userId )
    // } // componentWillReceiveProps

    //////////////////////////// Event handlers /////////////////////////////////

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
        postRequest( auth.user._id, auth.token, this.postData )
        .then( data => {
                if ( data.error ) {
                    this.setState( { error: data.error.error } ) 
                    return
                } // if
                console.log('New post: ', data)
                this.endLoading()
                // updateLocalJWT( data, () => {
                //     this.setState( { route: true } )
                // }) // updateLocalJWT
                this.setState( { route: true } )
        }) // then
    } // handleSubmit

    cancelButtonHandler = () => {
        this.setState( { isCancel: true } )
    } // cancelButtonHandler

    // handleUserInfo( userId ) {
    //     getUserInfo( userId, isAuth().token )
    //     .then( data => {
    //       const { _id, name, email, tutor, courses, program, description } = data
    //       if ( data.error ) this.setState( { route: true } )
    //       else this.setState( { _id, name, email, tutor, courses, program, description } )
    //     }) // then
    //   } // handleUserInfo

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

    outLinedInputField( label, key, style, placeholder ) {
        return <OutlinedTextField
                    label={ label }
                    onChange={ this.handleInputEntered( key ) }
                    style={ style }
                    placeholder={ placeholder }
                />
    } // outLinedInputField

    postForm = ( title, body, formStyle ) => {
        const { photo, currentPhoto } = this.state
        const newPhoto = photo ? URL.createObjectURL( photo ) : currentPhoto
        return (
            <div> 
                {/* <OutlinedTextField
                    label='Title'
                    onChange={ this.handleInputEntered( 'title' ) }
                    style={ { ...formStyle, marginTop: '30px' } }
                /> */}
                { this.outLinedInputField( 
                    'Title', 'title', { ...formStyle, marginTop: '30px' } 
                ) }
                { newPhoto && <Image url={ newPhoto } alt='newPhoto' /> }
                { this.inputField( '', 'photo', 'file', '', 'image/*' ) }
                { this.outLinedInputField( 
                    'Preferred place', 'place', formStyle, 'Preferred place for tutoring session' 
                ) }
                { this.outLinedInputField( 
                    'Preferred hours', 'hours', formStyle, 'Duration of tutor session' 
                ) }
                <OutlinedTextArea 
                    rows='20'
                    label='Body Context'
                    onChange={ this.handleInputEntered( 'body' ) }
                    style={ formStyle }
                />
                {/* <FormButton label='Create post' onClick={ this.handleSubmit } /> */}
                <FormButtons 
                    leftLabel='Create'
                    rightLabel='Cancel'
                    leftButtonHandler={ this.handleSubmit }
                    rightButtonHandler={ this.cancelButtonHandler }
                />  
            </div>
        ) // return
    } // postForm

    render() {
        const { title, body, photo, user, route, isLoading, isCancel, error } = this.state
        const formStyle = { display: 'flex', flexWrap: 'wrap' }

        return (
            route || isCancel ? <Redirect to='/posts' /> : 

            <main>
                <Blurb body='Got a question? Ask our tutors here!' />
                <div className='container'>
                    { isLoading && this.showLoadingIcon() }
                    { error && this.alertSection( error, '#F8BBD0', 'red' ) }
                    {/* <Image url={ this.getImage() } alt={ name } /> */}
                    { this.postForm( title, body, formStyle ) }
                </div>
                <Footer title='Post footer' contents={ 'add something here' } />
            </main>
        ) // return
    } // render
} // CreatePost

export default CreatePost;






// import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import { isAuth, getUserInfo, updateProcess } from '../../Auth';
// import { InputField, FormButton } from '../std/Form';
// import AlertDiv from '../User/alert';
// import CircularIndeterminate from '../Loading/CircularIndicator';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
// import Footer from '../std/Footer';
// import Blurb from '../std/Blurb';

// class CreatePost extends Component {
//     render() {
//         const style = {
//             paddingTop: '100px',
//             paddingBottom: '100px'
//         } // style
//         return (
//             <main>
//                 <Blurb body='Make your post' />
//                 <Container style={ style } maxWidth="md">
//                     <Typography gutterBottom variant="h5" component="h2" align='center'>
//                         implement form component here
//                     </Typography>
//                 </Container>
//                 <Footer title='CreatePost footer' contents={ 'Add contents here' } />
//             </main>
//         ) // return
//     } // render
// } // CreatePost

// export default CreatePost;
