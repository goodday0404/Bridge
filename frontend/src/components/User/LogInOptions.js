import React from 'react';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

export const Option = props => {
    const { msg } = props
    return (
        <Grid item xs>
            <Link href="#" variant="body2">
                { msg }
            </Link>
        </Grid>
    ) // return
} // Option

const LogInOptions = props => {
    return (
        <Grid container>
            <Option msg='Forgot password?' />
            <Option msg= "Sign Up" />
        </Grid>
    ) // return
} // LogInOptions

export default LogInOptions;