import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import styled from 'styled-components';

const HoverText = styled.p`
	color: #000;
	:hover {
		color: #ed1212;
		cursor: pointer;
	}
`

export const AlertDialog = props => {
    const { label, title, body, variant, size, handler, style, trash, addButton } = props
    const [open, setOpen] = React.useState(false)
    const dudUrl = 'javascript:;';

    function handleClickOpen() { setOpen(true) }
    function handleClose() { setOpen(false) }

    return (
        <div>
            
            {   // display trash can icon if trash attribute is true
                trash ? <IconButton aria-label="delete" onClick={handleClickOpen} >
                            <DeleteIcon />
                        </IconButton> :

                        <Button 
                            variant='outlined' size={ size } color="secondary" 
                            onClick={handleClickOpen} style={ style } 
                        >
                            { label }
                        </Button>
            }
            
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"> { title } </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        { body }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {   // add buttons only when addButton attribute is true
                        addButton && 
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                    }
                    {   // add buttons only when addButton attribute is true
                        addButton &&
                        <Button onClick={handleClose} color="primary" onClick={ handler } autoFocus>
                            Ok
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    ) // return
}