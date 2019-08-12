import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../../styles/PostStyle';
import { Link } from 'react-router-dom';

export const SimpleCardButton = props => {
    const { label, to } = props
    return (
        <Link to={ to } >
            <Button size="small" color="primary">
                { label }
            </Button>
        </Link>
    ) // return
} // SimpleCardButton

export const SimpleCardMedia = props => {
    const classes = useStyles()
    const { image, title } = props
    return (
        <CardMedia  className={classes.cardMedia}
                    image={ image }
                    title={ title }
                    component='img'
                    onError={ error => { error.target.src = 'https://source.unsplash.com/random' } }
        />
    ) // return
} // SimpleCardMedia

export const SimpleCardContents = props => {
    const classes = useStyles()
    const { head, contact, body } = props
    return (
        <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
                { head }
            </Typography>
            <Typography style={ { paddingBottom: '10px' } } >
                { contact }
            </Typography>
            <Typography>
                { body }
            </Typography>
        </CardContent>
    ) // return
} // SimpleCardMedia

export const DefaultCardActions = props => {
    const { to } = props
    return (
        <CardActions>
            <SimpleCardButton label='View' to={ to } />
            <SimpleCardButton label='Edit' to={ to } />
        </CardActions>
    ) // return
} // SimpleCardMedia
