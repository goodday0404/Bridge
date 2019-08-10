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
  const { onChange } = props

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-full-width"
        label="Courses"
        style={{ margin: 8, marginBottom: 8 }}
        placeholder="Enter course codes, eg) CS493 CS494 MATH239"
        helperText="Seperate course codes by space"
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={ onChange }
      />
    </form>
  ) // return
} // OutlinedTextFields

export default OutlinedTextField;
