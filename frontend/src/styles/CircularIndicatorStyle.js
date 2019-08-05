import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing( 2, 5 ),
      //alignItems: 'center',
      position: 'relative',
    },
  }));

export default useStyles;