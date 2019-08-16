import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const AlertDialog = props => {
    const { label, title, body, handler, style } = props
    const [open, setOpen] = React.useState(false)

    function handleClickOpen() { setOpen(true) }
    function handleClose() { setOpen(false) }

    return (
        <div>
            <Button variant="outlined" color="secondary" onClick={handleClickOpen} style={ style } >
                { label }
            </Button>
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
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary" onClick={ handler } autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    ) // return
}