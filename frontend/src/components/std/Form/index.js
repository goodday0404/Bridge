import React from 'react';
import Grid from '@material-ui/core/Grid';
import { GridButton } from '../Button';

const ImageInput = props => {
    const { type, accept, onChange } = props
    return (
        <input  onChange={ onChange }
                type={ type }
                accept={ accept }
                className="form-control"
        />
    ) // return  
} // ImageInput

const TextInput = props => {
    const { type, value, onChange } = props
    return (
        <input  onChange={ onChange }
                type={ type }
                value={ value }
                className="form-control"
        />
    ) // return  
} // TextInput

const UncontrolledInput = props => {
    const { type, value, onChange } = props
    return (
        <textarea  onChange={ onChange }
                    type={ type }
                    value={ value }
                    className="form-control"
        />
    ) // return  
} // UncontrolledInput

export const InputField = props => {
    const { label, type, accept, value, onChange, textarea } = props
    return (
        <div className="form-group">
            <label className="text-muted"> { label } </label>
            { accept ? 
                <ImageInput type={ type } accept={ accept } onChange={ onChange } /> :

                textarea ?
                    <UncontrolledInput type={ type } value={ value } onChange={ onChange } /> :
                    <TextInput type={ type } value={ value } onChange={ onChange } />
             }
        </div>
    ) // return 
} // InputField

export const FormButton = props => {
    const { label, onClick } =props
    return (
        <button style={ { marginBottom: '100px' } } onClick={ onClick } className="btn btn-raised btn-primary">
            { label }
        </button>
    ) // return 
} // FormButton

export const FormButtons = props => {
    const { post, leftLabel, rightLabel, leftButtonHandler, rightButtonHandler } = props
    const buttonStyle = { paddingLeft: '50px', paddingRight: '50px' } 
    return (
        <Grid container spacing={2} justify='center' style={ { paddingBottom: '80px' } } >
            <GridButton 
                label={ leftLabel }
                handler={ leftButtonHandler }
                color='primary'
                variant='outlined'
                style={ buttonStyle }
            />
            <GridButton 
                label={ rightLabel }
                variant='outlined'
                color='secondary' 
                handler={ rightButtonHandler } 
                style={ buttonStyle }
            />
        </Grid>
    ) // return
} // PostButtons

