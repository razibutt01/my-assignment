import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MdAddCircle } from 'react-icons/md';
import RoleForm from './RoleForm';


export default function FormRoleDialog() {
    const [open, setOpen] = React.useState(false);
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
                </DialogActions>
            </Dialog>
        </div>
    );
}