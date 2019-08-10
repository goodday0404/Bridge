import React from 'react';
import DefaultAvatar from '../../images/defaultAvatar.jpg';

const style = {
    // width: '100%', 
    // height: '15vw', 
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '30%',
    objectFit: 'cover',
    //paddingTop: '30px',
    paddingBottom: '30px',
} // style

const Image = props => (
    <img className="card-img-top" 
        src={ DefaultAvatar } 
        alt={ props.name }
        style={ style }
    />
) // Image

export default Image;