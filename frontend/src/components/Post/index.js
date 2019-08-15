import React from 'react';
import { Link } from 'react-router-dom';
import { path } from '../../Auth';
import { GridButton } from '../std/Button';

export const posterId = poster => poster ? `/user/${ poster._id }`  : '/posts'

export const posterName = poster => {
    return poster ? <Link to={ posterId( poster ) } > { poster.name } </Link> : 'Unknown'
} // posterName

export const getImage = post => {
    return path( `post/photo/${ post._id }` ) 
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
} // PostButtons