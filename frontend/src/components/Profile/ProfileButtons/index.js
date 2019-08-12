import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteAccount from '../DeleteAccount';

export const EditDeleteButtons = props => {
    const { userId } = props
    return (
        <div style={ { marginTop: '20px' } }>
            <Grid container spacing={2} justify="center">
                <Grid item>
                    <Link to={ `/user/edit/${ userId }`}>
                        <Button variant="contained" color="primary">
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

export class FollowUnFollowButtons extends Component {
    render() {
        return (
            <div style={ { marginTop: '20px' } }>
            <Grid container spacing={2} justify="center">
                <Grid item>
                    <button className='btn btn-success btn-raised mr-5'>
                        Follow
                    </button>
                </Grid>
                <Grid item>
                    <button className='btn btn-warning btn-raised'>
                        Unfollow
                    </button>
                </Grid>
            </Grid>
        </div>
        ) // return
    } // render
} // FollowUnFollowButtons