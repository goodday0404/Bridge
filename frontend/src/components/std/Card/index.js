import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import useStyles from '../../../styles/PostStyle';

export const SimpleCardButton = props => {
    const { label } = props
    return (
        <Button size="small" color="primary">
            { label }
        </Button>
    ) // return
} // SimpleCardButton

export const SimpleCardMedia = props => {
    const classes = useStyles()
    const { image, title } = props
    return (
        <CardMedia  className={classes.cardMedia}
                    image={ image }
                    title={ title }
        />
    ) // return
} // SimpleCardMedia

export const SimpleCardContents = props => {
    const classes = useStyles()
    const { head, body } = props
    return (
        <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
                { head }
            </Typography>
            <Typography>
                { body }
            </Typography>
        </CardContent>
    ) // return
} // SimpleCardMedia

export const DefaultCardActions = props => {
    return (
        <CardActions>
            <SimpleCardButton label='View' />
            <SimpleCardButton label='Edit' />
        </CardActions>
    ) // return
} // SimpleCardMedia
