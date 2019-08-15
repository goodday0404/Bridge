import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export const GridButton = props=> {
    const { label, handler, style, color, variant } = props
    return (
        <Grid item >
            <Button 
                variant={ variant } 
                color={ color } 
                onClick={ handler } 
                style={ style } 
            >
                { label }
            </Button>
        </Grid>
    ) // return
} // GridButton

