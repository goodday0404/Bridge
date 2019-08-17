import React, { PureComponent, createRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Input from './Input';
import Wrapper from './Wrapper';
import { isAuth } from '../../../Auth';
import { addCommentRequest } from '../../../API/postAPI';

class NewComment extends PureComponent {
  //static propTypes = { onNewComment: PropTypes.func.isRequired };

  constructor() {
    super()
    this.input = createRef()
    this.state = {
      comment: ''
    } // state
  } // constructor

  handleInputChange = event => {
    this.setState( { comment: event.target.value } )
  } // handleInputChange

  handleSubmit = event => {
    event.preventDefault() // prevent webbrowser from reloading
    const { comment } = this.state
    const { onNewComment } = this.props;
    //const { value } = this.input.current;
    const auth = isAuth()

    addCommentRequest( auth.user._id, this.props.post._id, auth.token, { text: comment } )
    .then( data => {
      if ( data.error ) {
        console.log( data.error )
        return
      } // if
      this.setState( { comment: '' } )
      onNewComment( data.comments )
    }) // then
    

    // if (value) {
    //   onNewComment(e, value);

    //   this.input.current.value = '';
    // }
  }

  render() {
    const style = {
      display: 'flex',
      flexWrap: 'wrap',
      paddingTop: '5px',
      //paddingBottom: '10px',
      marginLeft: '15px',
      marginRight: '16px'
    }
    return (
      // <Wrapper as="form" onSubmit={this.onSubmit}>
      //   <Input type="text" ref={this.input} placeholder="Add a comment" required />
      // </Wrapper>
      <form style={ style } noValidate autoComplete="off">
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
          <Button variant='outlined' color='primary' onClick={ this.handleSubmit } >
              Comment
          </Button>
      </form>
    );
  }
}
export default NewComment;
