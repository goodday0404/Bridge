import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    grow: {
      flexGrow: 1,
    }, // root
    menuButton: {
      marginRight: theme.spacing(2),
    }, // menuButton
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
    }, // title
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.7),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.9),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 620,
      },
    }, // inputInput
    AppBarButtons: {
      flexGrow: 1,
    }, // AppBarButtons
  })
); // useStyles

export default useStyles;