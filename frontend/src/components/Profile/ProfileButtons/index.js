import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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

