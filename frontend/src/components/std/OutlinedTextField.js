import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: '40px',
    paddingBottom: '50px'
  },
}));

const OutlinedTextField = props => {
  const classes = useStyles();
  const { label, value, placeholder, helperText, onChange, style, type, autoComplete } = props

  return (
    <form style={ style } noValidate autoComplete="off">
      <TextField
        id="outlined-full-width"
        label={ label }
        value={ value }
        placeholder={ placeholder }
        helperText={ helperText }
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={ onChange }
        style={ style }
        type={ type }
        autoComplete={ autoComplete }
      />
    </form>
  ) // return
} // OutlinedTextFields

export default OutlinedTextField;
