import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper } from '@material-ui/core';
import { Typography, Button, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LazyLoad from './LazyLoad';
import useUser from '@/hooks/useUser';
import { useUsersContext } from '@/hooks/useUsersContext';
import { UserDataContext } from '../context/SelectedUserContext';
import { apiFetch } from './apiFetch';
import type { GridEditCellProps, GridRowsProp } from '@mui/x-data-grid';



const useStyles = makeStyles({
    head: {
        height: "100%", width: "100%",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",

    },
    heading: {
        margin: "2px 0px 20px 5px ",
        borderBottom: "1px solid #808080"
    },
    table: {
        height: "500px", width: "90%", margin: "5px auto",
        '& .super-app-theme--header': {
            backgroundColor: '#808080',
            color: "white"
        },



    }
})
const UserNameCell = (props: GridEditCellProps) => {
    const { setSelectedUser } = React.useContext(UserDataContext);

    async function handleRowClick(id: number) {
        try {
            const data = await apiFetch("http://localhost:8000/users/" + id, {
                method: "GET",
            });
            setSelectedUser(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Button onClick={() => handleRowClick(props.row.id)}>
            {props.row.col1}
        </Button>
    );
};

const LeftUserCard = () => {
    const { state, dispatch } = useUsersContext()
    const { data, isPending, error } = useUser()
    async function handleDelete(id: any) {
        try {
            await apiFetch("http://localhost:8000/users" + "/" + id, {
                method: 'DELETE'
            });
            console.log('removed');
            dispatch({ type: 'DELETE_USERS', payload: { id: id } });
        } catch (error) {
            console.error(error);
        }
    }
    React.useEffect(() => {
        dispatch({ type: 'SET_USERS', payload: data })
    }, [data, dispatch])
    const columns = [
        { field: 'col1', headerName: 'Users', renderCell: UserNameCell, headerClassName: "super-app-theme--header", width: 500 },
        {
            field: 'col2',
            headerName: 'Actions',
            headerClassName: "super-app-theme--header", width: 130,
            renderCell: (params: any) => {
                return (
                    <IconButton onClick={() => handleDelete(params.id)}>
                        <DeleteIcon />
                    </IconButton>
                );
            },
        }
    ];
    const rows: GridRowsProp = Array.isArray(state.users)
        ? state.users.map((user) => (
            { id: user.id, col1: (user.firstName + " " + user.lastName) }
        ))
        : [];
    const classes = useStyles()
    if (isPending) {
        return (
            <LazyLoad state={"Loading...."} />
        )
    }
    if (error) {
        return (
            <LazyLoad state={error} />
        )
    }

    return (
        <Box component={Paper} className={classes.head}>
            <Box className={classes.heading}>
                <Typography variant="h4" align='justify' style={{ fontWeight: 700, }}>
                    Manage Users
                </Typography>
            </Box>
            <Box className={classes.table} >

                <DataGrid rows={rows} columns={columns}
                // onRowClick={handleRowClick}

                />
            </Box>
        </Box>

    )
}

export default LeftUserCard;