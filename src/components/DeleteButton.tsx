import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
    data: { id: number, firstName: string, lastName: string };
    onDelete: (data: { id: number, firstName: string, lastName: string }) => void;
}

const DeleteButton: React.FC<Props> = ({ data, onDelete }) => {
    return (
        <IconButton onClick={() => onDelete(data)}>
            <DeleteIcon />
        </IconButton>
    );
};

export default DeleteButton;
