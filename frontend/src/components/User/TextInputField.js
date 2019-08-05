import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextInputField = props => {
    const { inputType, textLabel, onChange, focus } = props
    return (
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id={ inputType }
          label={ textLabel }
          name={ inputType }
          autoComplete={ inputType }
          autoFocus={ focus }
          onChange={ onChange( inputType ) }
        />
    ) // return
} // TextInputField

export default TextInputField;