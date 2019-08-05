import React from 'react';
import Button from '@material-ui/core/Button';
import useStyles from '../../styles/SignUpStyle';

const SubmitButton = props => {
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={ useStyles.submit }
            onClick={ props.onClick }
        >
            { props.buttonName }
        </Button>
    ) // return
} // SubmitButton

export default SubmitButton;