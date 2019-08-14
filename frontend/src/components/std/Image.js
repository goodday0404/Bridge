import React from 'react';
import DefaultAvatar from '../../images/defaultAvatar.jpg';

const style = {
    // width: '100%', 
    height: '400px', 
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'auto',
    objectFit: 'cover',
    //paddingTop: '30px',
    paddingBottom: '30px',
} // style

const defaultImage = 'https://source.unsplash.com/random'

const handleError = image => { image.target.src = `${ defaultImage }` }

const Image = props => {
    const { url, name } = props
    return (
        <img className="card-img-top" 
            src={ url ? url : DefaultAvatar } 
            alt={ name }
            style={ style }
            //onError={ image => { image.target.src = `${ DefaultAvatar }` } }
            onError={ image => { image.target.src = `${ defaultImage }` } } 
        />
    ) // return
} // Image

export default Image;