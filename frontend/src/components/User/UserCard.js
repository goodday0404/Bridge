import React from 'react';
import Card from '@material-ui/core/Card';
import useStyles from '../../styles/PostStyle';
import { SimpleCardMedia, SimpleCardContents, DefaultCardActions } from '../std/Card';

const UserCard = props => {
    const classes = useStyles()
    const { image, title, head, email, program, body, to } = props
    const style = { paddingTop: '30%', height: '350px', width: 'auto' } 
    return (
        <Card className={classes.card}>
            <SimpleCardMedia image={ image } title={ title } style={ style } />
            <SimpleCardContents head={ head } contact={ email } program={ program } body={ body } />
            <DefaultCardActions label='View' to={ to } />
        </Card>
    ) // return
} // UserCard

export default UserCard;