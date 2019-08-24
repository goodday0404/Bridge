import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import { pink } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteAccount from '../DeleteAccount';
import { GridButton } from '../../std/Button'
import { followRequest, unfollowRequest } from '../../../Auth';

export const EditDeleteButtons = props => {
    const { userId } = props
    return (
        <div style={ { marginTop: '20px' } }>
            <Grid container spacing={2} justify="center">
                <Grid item>
                    <Link to={ `/user/edit/${ userId }`}>
                        <Button variant="outlined" color="primary">
                            Edit  Profile
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <DeleteAccount userId={ userId } />
                </Grid>
            </Grid>
        </div> 
    ) // return
} // EditDeleteButtons

const followButton = ( label, handleClick ) => {
    // const buttonType = label === 'Follow' ? 'btn btn-success btn-raised' : 
    //                                         'btn btn-warning btn-raised'
                                            
    // return (
    //     <Grid item>
    //         <button style={ { marginBottom: '50px' } } className={ buttonType } onClick={ handleClick } >
    //             { label }
    //         </button>
    //     </Grid>
    // ) // return
    const color = label === 'Follow' ? 'primary' : 'secondary'
    return (
        <GridButton label={ label } variant='outlined' color={ color } handler={ handleClick } />
    )
} // followButton

export class FollowUnFollowButtons extends Component {
    handleClickFollow = () => {
        this.props.clickHandler( followRequest )
    } // handleClick

    handleClickUnfollow = () => {
        this.props.clickHandler( unfollowRequest )
    } // handleClick

    render() {
        return (
            <div style={ { marginTop: '20px' } }>
            <Grid container spacing={2} justify="center">
                { 
                    this.props.follow ? followButton( 'Unfollow', this.handleClickUnfollow ) : 
                                        followButton( 'Follow', this.handleClickFollow ) 
                }
            </Grid>
        </div>
        ) // return
    } // render
} // FollowUnFollowButtons

const TutorButton = ( show, handler ) => {
    const label = show ? 'Hide My Tutors' : 'Show My Tutors' 
    const color =  show ? 'secondary' : 'primary' 
    return <GridButton 
                label={ label } 
                variant='outlined' 
                color={ color } 
                handler={ handler } 
           />
} // TutorButton

export const ShowMyTutorsButton = props => {
    const { show, handler } = props
    return (
        TutorButton( show, handler )
    ) // return
} // ShowMyTutorsButton

const StudentButton = ( show, handler ) => {
    const label = show ? 'Hide My Students' : 'Show My Students' 
    const color =  show ? 'secondary' : 'primary' 
    return <GridButton 
                label={ label } 
                variant='contained' 
                color={ color } 
                handler={ handler } 
           />
} // TutorButton

export const ShowMyStudentsButton = props => {
    const { show, handler } = props
    return (
        StudentButton( show, handler )
    ) // return
} // ShowMyStudentsButton


const useStyles = makeStyles(theme => ({
    avatar: {
      // backgroundColor: red[500],
      color: red[500],
    },
    shareButton: {
      color: pink[500],
    },
    shareContainer: {
      paddingTop: '10px',
      paddingBottom: '20px'
    },
}));
  
const HeartIcon = () => {
    const classes = useStyles()
    return (
        <FavoriteIcon className={ classes.avatar } />
    ) // return
} // HeartIcon

const ShareButton = props => {
    const { handler } = props
    const classes = useStyles()
    return (
        <Button color="secondary" className={ classes.shareButton } onClick={ handler } >
            <Box fontStyle="italic" m={1}>
                Share nice things about this tutor here!
            </Box>
            {/* Share nice things about this tutor here! */}
        </Button>
    ) // return
} // ShareButton

export const ShareAboutTutor = props => {
    const { handler } = props
    const classes = useStyles()
    return (
        <Container className={ classes.shareContainer } justify="center" >
            <Grid container justify="center" alignItems="center" spacing={ 2 } >
                <Grid item> <HeartIcon /> </Grid>
                <Grid item> <ShareButton handler={ handler } /> </Grid>
                <Grid item> <HeartIcon /> </Grid>
            </Grid>
        </Container>
    ) // return
} // ShareAboutTutor

