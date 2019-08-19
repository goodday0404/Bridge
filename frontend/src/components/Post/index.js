import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { path } from '../../Auth';
import { GridButton } from '../std/Button';
import { AlertDialog } from '../std/Alert';

export const posterId = poster => poster ? `/user/${ poster._id }`  : '/posts'

export const posterName = poster => {
    return poster ? <Link to={ posterId( poster ) } > { poster.name } </Link> : 'Unknown'
} // posterName

export const getImage = post => {
    const date = new Date().getTime()
    return path( `post/photo/${ post._id }?${ date }` ) 
} // getImage

export const PostButton = props => {
    const { label, variant, color, handler } = props
    return (
        <GridButton 
            label={ label }
            handler={ handler } 
            style={ { marginTop: '10px' } }
            color={ color }
            variant={ variant }
        />
    ) // return 
} // PostButton

export const PostButtons = props => {
    const { post, leftLabel, rightLabel, leftButtonHandler, rightButtonHandler } = props
    return (
        <Grid container spacing={2} justify='center' >
            <PostButton 
                label={ leftLabel }
                variant='outlined'
                color='primary' 
                handler={ leftButtonHandler( post ) } 
            />
            {/* <PostButton 
                label='Delete'
                variant='outlined'
                color='secondary' 
                handler={ rightButtonHandler( post ) } 
            /> */}
            <AlertDialog 
                label={ rightLabel } 
                title='Do you want to delet this post?'
                body='This action will permanently delete this post, and it can not be retored.'
                handler={ rightButtonHandler( post ) } 
                style={ { marginTop: '18px' } }
                cancelButton={ true }
                addButton={ true }
            />
        </Grid>
    ) // return
} // PostButtons