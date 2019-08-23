import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { Edit } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Photo from './Photo';
//import CommentPropTypes from './PropTypes';
import Wrapper from './Wrapper';
import DateView from './Date';
import { AlertDialog } from '../std/Alert';
import { isAuth } from '../../Auth';
import { deleteCommentRequest, modifyCommentRequest, deleteTutorCommentRequest,
         modifyTutorCommentRequest } from '../../API/postAPI';
import OutlinedTextArea from '../std/OutlinedTextArea';

export const getFormattedTimestamp = (time) => {
    const diff = (Date.now() - time) / 1000 / 60; // Minutes
    if (diff < 60) return `${Math.round(diff)}m`
    if (diff >= 60 && diff < 24 * 60) return `${Math.round(diff / 60)}h`
    return `${Math.round(diff / (24 * 60))}d`
} // getFormattedTimestamp

class Comment extends Component {
    state = {
        _id: this.props._id,
        post: this.props.post,
        comment: this.props.comment,
        photo: this.props.photo,
        text: '',
        isEdit: false,
        isCancel: false
    } // state

    isLogInUser = ( logInUser, poster ) => {
        return logInUser && ( poster != undefined ) && logInUser._id === poster._id
    } // isLogInUser

    isValidComment = () => {
      if ( this.state.text.length > 0 ) return true
      return false
    } // validateComment

    componentDidMount() {
        this.commentData = new FormData()
    } // componentDidMount

    handleInputEntered = key => event => {
        let value = event.target.value;
        this.commentData.set( key, value )
        this.setState( { [ key ]: value } )
    } // handleChange

    handleEdit = () => {
        this.setState( { isEdit: true, text: this.state.comment.text } )
    } // handleDelete

    handleDelete = comment => () => {
        const auth = isAuth() 
        // deleteCommentRequest( auth.user._id, this.props._id, auth.token, comment )
        // .then( data => {
        //   if ( data.error ) console.log( data.error )
        //   // else this.props.onDeleteComment( data.comments )
        //   else this.props.onComment( data.comments )
        // }) // then

        const handleResponse = data => {
            if ( data.error ) console.log( data.error )
            else this.props.onComment( data.comments )
        } // handleResponse

        if ( this.props.isPost ) {
            deleteCommentRequest( auth.user._id, this.props._id, auth.token, comment )
            .then( handleResponse )
            return
        } // if
        deleteTutorCommentRequest( auth.user._id, this.props._id, auth.token, comment )
            .then( handleResponse )
    } // handleDelete

    handleSubmit = event => {
        event.preventDefault() // prevent webbrowser from reloading
        if ( !this.isValidComment() ) return
        let comment = this.state.comment
        comment.text = this.state.text
        
        const auth = isAuth() 
        // modifyCommentRequest( auth.user._id, this.state._id, auth.token, comment )
        // .then( data => {
        //   if ( data.error ) {
        //       console.log( data.error )
        //       return
        //   } // if 
        //   // this.props.onModifiedComment( data.comments, '' )
        //   this.props.onComment( data.comments )
        //   this.setState( { isEdit: false } )
        // }) // then

        const handleResponse = data => {
            if ( data.error ) {
                console.log( data.error )
                return
            } // if 
            this.props.onComment( data.comments )
            this.setState( { isEdit: false } )
        } // handleResponse

        if ( this.props.isPost ) {
            modifyCommentRequest( auth.user._id, this.state._id, auth.token, comment )
            .then( handleResponse )
            return
        } // if
        modifyTutorCommentRequest( auth.user._id, this.props._id, auth.token, comment )
        .then( handleResponse )
    } // handleSubmit

    cancelButtonHandler = () => {
        this.setState( { isEdit: false } )
    } // cancelButtonHandler

    render() {
        const { post, comment, photo, isEdit } = this.state
        const { name, postedBy, text, created } = comment
        const isAuthor = this.isLogInUser( isAuth().user, postedBy )
        //const { onDeleteComment } = this.props
        const formStyle = { display: 'flex', flexWrap: 'wrap' }

        return (
          <>
          <Wrapper>
            <div>
              <Photo 
                  src={ photo } 
                  alt={ name } 
                  size="small"  
                  onError={ error => { 
                    error.target.src = 'https://source.unsplash.com/random' 
                  } }
              />
            </div>
            <div>
              <strong>
                  <Link to={ `/user/${ postedBy._id }` } > { postedBy.name } </Link>
              </strong>
              <br />
              { isEdit ? <></> : <>{ text }</> }
            </div>
            {
             !isEdit &&
              
              <>
                  <DateView>{ new Date( created ).toDateString() }</DateView>
                  { // display edit icon only on comment of this user.
                    isAuthor && <IconButton aria-label="edit" onClick={ this.handleEdit } >
                                    <Edit />
                                </IconButton> 
                  }
                  { // display trash icon only on comment of this user.
                    isAuthor && <AlertDialog 
                                    label='Delete' 
                                    title='Do you want to delele this Comment?'
                                    body='This actino will permenantly delele this Comment'
                                    handler={ this.handleDelete( comment ) } 
                                    trash={ true }
                                    addButton={ true }
                                />
                  }
              </>
            }
            {/* <DateView>{ new Date( created ).toDateString() }</DateView>
            { // display edit icon only on comment of this user.
              isAuthor && <IconButton aria-label="edit" onClick={ this.handleEdit } >
                              <Edit />
                          </IconButton> 
            }
            { // display trash icon only on comment of this user.
              isAuthor && <AlertDialog 
                              label='Delete' 
                              title='Do you want to delele this Comment?'
                              body='This actino will permenantly delele this Comment'
                              handler={ this.handleDelete( comment ) } 
                              trash={ true }
                              addButton={ true }
                          />
            } */}
          </Wrapper>
          {
           isEdit && 
            <div>
                {/* <OutlinedTextArea 
                    rows='1'
                    label='Comment'
                    value={ text }
                    onChange={ this.handleInputEntered( 'body' ) }
                    style={ formStyle }
                /> */}
                <form style={ formStyle } noValidate autoComplete="off">
                    <TextField
                      id="outlined-multiline-static"
                      label='Update'
                      value={ this.state.text }
                      multiline
                      fullWidth
                      rows={ 2 }
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={ { shrink: true } }
                      onChange={ this.handleInputEntered( 'text' ) }
                    />
                </form>
                 <Grid container spacing={2} style={ { paddingBottom: '10px' } } >
                    {
                      this.isValidComment() ? 
                      <Grid item >
                          <Button variant='outlined' color='primary' onClick={ this.handleSubmit } >
                              Update
                          </Button> 
                      </Grid> :
                      
                      <Grid item >
                          <AlertDialog 
                              label='Update' 
                              title='Comment is empty'
                              body='It requires at least one character'
                              handler={ this.cancelButtonHandler } 
                              //style={ { marginTop: '18px' } }
                          />
                      </Grid>
                    }
                    <Grid item >
                        <Button variant='outlined' color='inherit' onClick={ this.cancelButtonHandler } >
                            Cancel
                        </Button> 
                    </Grid>
                </Grid>
            </div>
          }
          </>
    ) // return
  } // render
} // Comment

// const isLogInUser = ( logInUser, poster ) => {
//     return logInUser && ( poster != undefined ) && logInUser._id === poster._id
// } // isLogInUser

// const Comment = ( { photo, post, comment, onDeleteComment } ) => {
//     const { name, postedBy, text, created } = comment
//     const isAuthor = isLogInUser( isAuth().user, postedBy )

//     const handleEdit = comment => () => {

//     } // handleDelete

//     const handleDelete = comment => () => {
//       const auth = isAuth() 
//       deleteCommentRequest( auth.user._id, post._id, auth.token, comment )
//       .then( data => {
//         if ( data.error ) console.log( data.error )
//         else onDeleteComment( data.comments )
//       }) // then
//     } // handleDelete

//     return (
//       <Wrapper>
//         <div>
//           <Photo 
//               src={ photo } 
//               alt={ name } 
//               size="small"  
//               onError={ error => { 
//                 error.target.src = 'https://source.unsplash.com/random' 
//               } }
//           />
//         </div>
//         <div>
//           <strong>
//               <Link to={ `/user/${ postedBy._id }` } > { postedBy.name } </Link>
//           </strong>
//           <br />
//           { text }
//         </div>
//         {/* <DateView>{getFormattedTimestamp(createdAt)}</DateView> */}
//         <DateView>{ new Date( created ).toDateString() }</DateView>
//         { // display edit icon only on comment of this user.
//           isAuthor && <IconButton aria-label="edit" onClick={ handleEdit } >
//                           <Edit />
//                       </IconButton> 
//         }
//         { // display trash icon only on comment of this user.
//           isAuthor && <AlertDialog 
//                           label='Delete' 
//                           title='Do you want to delele this Comment?'
//                           body='This actino will permenantly delele this Comment'
//                           handler={ handleDelete( comment ) } 
//                           trash={ true }
//                           addButton={ true }
//                       />
//         }
//       </Wrapper>
// )}

//Comment.propTypes = CommentPropTypes;

export default Comment;