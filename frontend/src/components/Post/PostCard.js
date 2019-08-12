import React from 'react';
import Card from '@material-ui/core/Card';
import useStyles from '../../styles/PostStyle';
import { SimpleCardMedia, SimpleCardContents, DefaultCardActions } from '../std/Card';

const PostCard = props => {
    const classes = useStyles()
    const { image, title, head, email, body, to } = props
    return (
        <Card className={classes.card}>
            <SimpleCardMedia image={ image } title={ title } />
            <SimpleCardContents head={ head } contact={ email } body={ body } />
            <DefaultCardActions to={ to } />
        </Card>
    ) // return
} // PostCard

export default PostCard;