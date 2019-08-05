import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from '../../styles/CircularIndicatorStyle';

const CircularIndeterminate = () => {
  const classes = useStyles();
  return (
    <div>
      <CircularProgress className={classes.progress} />
      <CircularProgress className={classes.progress} color='secondary' />
      <CircularProgress className={classes.progress} color='inherit' />
    </div>
  ); // return
} // CircularIndeterminate

export default CircularIndeterminate;