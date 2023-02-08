import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MdAddCircle } from 'react-icons/md';
import Create from './CreateEditForm';
import { UserDataContext } from '@/context/SelectedUserContext';


export default function FormUserDialog() {
    const [open, setOpen] = React.useState(false);
    const { setSelectedUser } = React.useContext(UserDataContext);
    const handleClickOpen = () => {
        setSelectedUser({ id: 0, firstName: "", lastName: "", email: "", phone: "" })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <Button style={{ borderBottom: "1px solid black" }} onClick={handleClickOpen}>
                <MdAddCircle title='Add new User' size={50} />
            </Button>

            <Dialog open={open} onClose={handleClose}  >
                <DialogTitle style={{ borderBottom: "2px solid black", fontWeight: 700 }} >Create new User</DialogTitle>
                <DialogContent style={{ margin: "50px auto", width: "500px" }}>
                    <Create />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}