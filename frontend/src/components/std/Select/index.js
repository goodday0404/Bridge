import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      marginLeft: theme.spacing(2),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

export const SelectOutlined = props => {
    const { isTutor, handleSelect } = props
    const classes = useStyles();
    const [values, setValues] = React.useState({
        criteria: '',
        name: 'hai',
      });

    const handleChange = call => event => {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }))
        call( event )
    }
    
    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">
                Critaria
            </InputLabel>
            <Select
                value={ values.criteria }
                onChange={ handleChange( handleSelect ) }
                inputProps={ { name: 'criteria', id: 'age-simple' } }
            >
                { 
                    isTutor ?   <MenuItem value='courses'> <em>Course</em> </MenuItem> :
                                <MenuItem value='program'> <em>Program</em> </MenuItem>
                }
                
                <MenuItem value='name'> Name </MenuItem>
                <MenuItem value='email'> Email </MenuItem>
            </Select>
        </FormControl>
    ) // return
} // SelectOutlind


export const SelectPost = props => {
    const { handleSelect } = props
    const classes = useStyles();
    const [values, setValues] = React.useState({
        criteria: '',
        name: 'hai',
      });

    const handleChange = call => event => {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }))
        call( event )
    }
    
    return (
        <FormControl className={classes.formControl} style={ { marginLeft: '100px' } } >
            <InputLabel htmlFor="select-simple">
                Critaria
            </InputLabel>
            <Select
                value={ values.criteria }
                onChange={ handleChange( handleSelect ) }
                inputProps={ { name: 'criteria', id: 'select-simple' } }
            >
                <MenuItem value='title'> <em>Title</em> </MenuItem>
                <MenuItem value='body'> Description </MenuItem>
                <MenuItem value='name'> Author </MenuItem>
            </Select>
        </FormControl>
    ) // return
} // SelectPost






