import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
    group: {
      margin: theme.spacing(1, 0),
    },
}));

const RadioButton = props => {
    const classes = useStyles();
    const { onChange } = props
    const [ value, setValue ] = React.useState('Yes');

    const handleChange = event=> {
      setValue( event.target.value );
      onChange( event )
    }
    return (
        <FormControl component="fieldset" className={classes.formControl}>
            {/* <FormLabel component="legend">Do you want to be a tutor?</FormLabel> */}
            <RadioGroup
                aria-label="gender"
                name="gender1"
                className={classes.group}
                value={ value }
                onChange={ handleChange }
            >
                <FormControlLabel value='yes' control={<Radio />} label="Yes" />
                <FormControlLabel value='no' control={<Radio />} label="No" />
            </RadioGroup>
      </FormControl>

        // {/* // <FormControlLabel
        // //         control={
        // //         <Checkbox checked={ checked } onChange={ onChange } value={ value } color={ color }/>
        // //         }
        // //         label={ label }
        // // /> */}
    ) // return
}
    

export default RadioButton;

