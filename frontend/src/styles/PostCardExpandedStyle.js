import { makeStyles } from '@material-ui/core/styles';
import { green, pink } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    // card: {
    //     display: 'flex',
    // },
    // cardDetails: {
    //     flex: 1,
    // },
    title: {
        textAlign: 'center',
        paddingTop: '10px',
        paddingBottom: '30px',
    },
    name: {
        textAlign: 'center',
    },
    email: {
        textAlign: 'center',
        color: 'purple'
    },
    date: {
        textAlign: 'center',
        //paddingBottom: '10px',
    },
    body :{
        fontSize: '20px',
        paddingTop: '30px',
    },
    about: {
        textAlign: 'center',
        color: 'navy',
        fontSize: '20px',
    },
    schoolAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: pink[500],
    },
    showMyTutors :{
        color: 'purple'
    },
    tutor: {
        textAlign: 'center',
        color: '#ff0066'
        //color: 'green'
    },
    follower: {
        textAlign: 'center',
        color: 'green'
    },
})) // useStyles

export default useStyles;