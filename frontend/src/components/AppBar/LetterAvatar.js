import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../styles/LetterAvatarStyle';

const LetterAvatars = props => {
  const classes = useStyles();
  const { initial } = props
  return (
    // <Grid container justify="center" alignItems="center">
    //   <Avatar className={classes.avatar}>H</Avatar>
    //   <Avatar className={classes.orangeAvatar}>N</Avatar>
    //   <Avatar className={classes.purpleAvatar}>OP</Avatar>
    // </Grid>
    <Avatar className={classes.purpleAvatar}> { initial } </Avatar>
  );
}

export default LetterAvatars