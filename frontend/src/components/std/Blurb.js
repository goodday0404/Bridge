import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from '../../styles/PostStyle';

const Title = props => {
    const { title } = props
    return (
        <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
            { title }
        </Typography>
    ) // return
} // Title

const Body = props => {
    const { body } = props
    return (
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
            { body }
        </Typography>
    ) // return
} // Body

const Blurb = props => {
    const classes = useStyles()
    const { body } = props
    return (
        <div className={classes.heroContent}>
            <Container maxWidth="md">
                {/* <Title title={ title } /> */}
                <Body body={ body } />
            </Container>
        </div>
    ) // return
} // Blurb

export default Blurb;


{/* <div className={classes.heroButtons}>
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
</div> */}