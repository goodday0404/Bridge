import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../styles/CircularIndicatorStyle';

// style={ { paddingTop: '100px', paddingBottom: '100px' } }

const CircularIndeterminate = props => {
  const classes = useStyles();
  return (
    // <div>
    //   <CircularProgress className={classes.progress} />
    //   <CircularProgress className={classes.progress} color='secondary' />
    //   <CircularProgress className={classes.progress} color='inherit' />
    // </div>
    <Container  maxWidth="lg" style={ props.style } >
      <Grid container justify="center" alignItems="center">
        <Grid item >
          <CircularProgress className={classes.progress} /> 
        </Grid>
        <Grid item >
          <CircularProgress className={classes.progress} color='secondary' /> 
        </Grid>
        <Grid item >
          <CircularProgress className={classes.progress} color='inherit' /> 
        </Grid>
      </Grid>
    </Container>
  ); // return
} // CircularIndeterminate

export default CircularIndeterminate;