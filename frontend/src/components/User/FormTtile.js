import React from 'react';
import Typography from '@material-ui/core/Typography';

const FormTittle = props => {
    return (
        <Typography component="h1" variant="h5">
            { props.title }
        </Typography>
    ) // return
} // FormTittle

export default FormTittle;