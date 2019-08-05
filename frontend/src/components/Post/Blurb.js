import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import useStyles from '../../styles/PostStyle';

const Blurb = proprs => {
    const classes = useStyles()
    return (
        <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Album layout
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Something short and leading about the collection below—its contents, the creator, etc.
                    Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                    entirely.
                </Typography>
                <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
                    <Grid item>
                        <Button variant="contained" color="primary">
                        Main call to action
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary">
                        Secondary action
                        </Button>
                    </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    ) // return
} // Blurb

export default Blurb;
