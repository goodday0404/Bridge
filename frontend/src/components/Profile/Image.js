import React from 'react';
import DefaultAvatar from '../../images/defaultAvatar.jpg';

const Image = props => (
    <img className="card-img-top" 
        src={ DefaultAvatar } 
        alt={ props.name }
        style={ { width: '100%', height: '15vw', objectFit: 'cover' } }
    />
) // Image

export default Image;