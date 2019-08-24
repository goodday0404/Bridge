import React, { PureComponent, createRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { pink } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PropTypes from 'prop-types';
import Input from './Input';
import Wrapper from './Wrapper';
import { isAuth } from '../../../Auth';
import { addCommentRequest, addTutorCommentRequest } from '../../../API/postAPI';
import { AlertDialog } from '../../std/Alert';
import StarRatings from 'react-star-ratings';
import { FormatItalic } from '@material-ui/icons';

class NewComment extends PureComponent {
  //static propTypes = { onNewComment: PropTypes.func.isRequired };

  constructor() {
    super()
    this.input = createRef()
    this.state = {
      comment: '',
    } // state
  } // constructor

  isValidComment = () => {
    if ( this.state.comment.length > 0 ) return true
    return false
  } // validateComment

  handleInputChange = event => {
    this.setState( { comment: event.target.value } )
  } // handleInputChange

  handleSubmit = event => {
    event.preventDefault() // prevent webbrowser from reloading
    if ( !this.isValidComment() ) return
    const { comment } = this.state
    const { onNewComment } = this.props;
    //const { value } = this.input.current;
    const auth = isAuth()

    const handleResponse = data => {
        if ( data.error ) {
          console.log( data.error )
          return
        } // if
        this.setState( { comment: '' } )
        onNewComment( data.comments )
    } // handleResponse

    if ( this.props.isPost ) {
        addCommentRequest( auth.user._id, this.props._id, auth.token, { text: comment } )
        .then( handleResponse )
        return
    } // if
    addTutorCommentRequest( auth.user._id, this.props._id, auth.token, { text: comment } )
    .then( handleResponse )
  }

  render() {
    const formStyle = {
      display: 'flex', flexWrap: 'wrap', paddingTop: '5px', marginLeft: '15px', 
      marginRight: '16px'
    }
    const textStyle = {
      textAlign: 'center', color: '#cc3399', fontSize: '20px', marginTop: '10px',
    }

    return (
      <main>
          <form style={ formStyle } noValidate autoComplete="off">
              <TextField
                id="outlined-full-width"
                label='comment'
                value={ this.state.comment }
                placeholder='Add a comment'
                // helperText={ helperText }
                fullWidth
                multiline
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={ this.handleInputChange }
              />
              {
                  this.isValidComment() ? 
                  <Button variant='outlined' color='primary' onClick={ this.handleSubmit } >
                      Comment
                  </Button> :

                  <AlertDialog 
                      label='Comment' 
                      title='Comment is empty'
                      body='It requires at least one character'
                      handler={ () => {} } 
                      //style={ { marginTop: '18px' } }
                  />
              }
          </form>
      </main>
    ) // return
  } // render
} // NewComment
export default NewComment;
