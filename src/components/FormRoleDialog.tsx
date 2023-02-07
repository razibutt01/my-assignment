import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@material-ui/core';
import { MdAddCircle } from 'react-icons/md';
import { MenuItem, Select, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import RoleForm from './RoleForm';

const useStyles = makeStyles({
    fields: {
        margin: "10px auto"
    },
    options: {
        display: "flex",
        flexDirection: "column"
    },
    area: {
        maxWidth: "300px",
        height: "300px"

    }
})
export default function FormRoleDialog() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <Button style={{ borderBottom: "1px solid black" }} onClick={handleClickOpen}>
                <MdAddCircle title='Add new Role' size={50} />
            </Button>

            <Dialog open={open} onClose={handleClose} >
                <DialogTitle style={{ borderBottom: "2px solid black", fontWeight: 700 }}>Create new Role</DialogTitle>
                <DialogContent style={{ margin: "50px auto", width: "500px" }}>
                    <RoleForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    {/* <Button onClick={handleClose}>Create</Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}