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

const OutlinedTextArea = props => {
  const classes = useStyles();
  const { rows, label, value, placeholder, helperText, onChange } = props

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        //id="outlined-multiline-static"
        label={ label }
        value={ value }
        multiline
        fullWidth
        rows={ rows }
        //defaultValue=''
        placeholder={ placeholder }
        helperText={ helperText }
        className={ classes.textField }
        margin="normal"
        variant="outlined"
        InputLabelProps={ { shrink: true } }
        onChange={ onChange }
      />
    </form>
  ) // return
} // OutlinedTextAreas

export default OutlinedTextArea;
