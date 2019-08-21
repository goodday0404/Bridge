import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from '../../styles/PostStyle';
// import Button from '@material-ui/core/Button';

const Title = props => {
    const { title } = props
    return (
        <Typography component="h4" variant="h3" align="center" color="textPrimary" gutterBottom>
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
    const { title, body, both } = props
    return (
        <div className={classes.heroContent}>
            <Container maxWidth="md">
                { title ? <Title title={ title } /> : <Body body={ body } /> }
                { both && <Body body={ body } /> }
                {/* <Title title={ title } />
                <Body body={ body } /> */}
            </Container>
        </div>
    ) // return
} // Blurb

export default Blurb;