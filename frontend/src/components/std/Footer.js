import React from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../styles/PostStyle';

// function MadeWithLove() {
//     return (
//       <Typography variant="body2" color="textSecondary" align="center">
//         {'Built with love by the '}
//         <Link color="inherit" href="https://material-ui.com/">
//           Material-UI
//         </Link>
//         {' team.'}
//       </Typography>
//     );
//   }

const Footer = props => {
    const classes = useStyles();
    const { title, contents } = props
    return (
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            { title }
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
              { contents }
          </Typography>
          {/* <MadeWithLove /> */}
        </footer>
    ) // return
} // Footer

export default Footer;