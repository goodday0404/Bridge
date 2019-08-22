import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green, purple, blue } from '@material-ui/core/colors';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import CheckBoxIcon from '@material-ui/icons/CheckBox';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const ColorCheckbox = withStyles({
  root: {
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

export const CheckBox = props => {
    const { label, checked, handler } = props
    // const [state, setState] = React.useState({
    //     checked: true,
    // });

    //   const handleChange = name => event => {
    //     setState({ ...state, [name]: event.target.checked });
    //   };

    return (
        //<FormGroup row>
        <FormControlLabel
            control={
            <ColorCheckbox
                //checked={ state.checked }
                checked={ checked }
                onChange={ handler( 'checked' ) }
                value={ checked }
            />
            } // control
            label={ label }
        />
        //   <FormControlLabel
        //     control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH" />}
        //     label="Custom icon"
        //   /> 
        //</FormGroup>
    ) // return
} // CheckBox