import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { DataGrid, GridRowsProp, GridEditCellProps } from '@mui/x-data-grid';
import { Box, Paper } from '@material-ui/core';
import { Typography, Button, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import useUser from '@/hooks/useUser';
import { useUsersContext } from '@/hooks/useUsersContext';
import { UserDataContext } from '../context/SelectedUserContext';



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

    function handleRowClick(id: number) {
        fetch("http://localhost:8000/users/" + id, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            },
        }).then(res => res.json())
            .then(data => setSelectedUser(data))
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
    function handleDelete(id: any) {
        fetch("http://localhost:8000/users" + "/" + id, {
            method: 'DELETE'
        }).then(() => {
            console.log('removed');
        }).catch(err => {
            console.error(err)
        });
        dispatch({ type: 'DELETE_USERS', payload: { id: id } })

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
            <Box component={Paper} className={classes.head}>
                <Box className={classes.heading}>
                    <Typography variant="h4" align='justify' style={{ fontWeight: 700, }}>
                        Manage Users
                    </Typography>
                </Box>
                <Box style={{ margin: "100px auto" }}>

                    <Typography variant="h5" style={{ fontWeight: 700 }}>Loading....</Typography>
                </Box>
            </Box>



        )
    }
    if (error) {
        return (
            <Box component={Paper} className={classes.head}>
                <Box className={classes.heading}>
                    <Typography variant="h4" align='justify' style={{ fontWeight: 700, }}>
                        Manage Users
                    </Typography>
                </Box>
                <Box style={{ margin: "100px auto" }}>

                    <Typography variant="h5" style={{ fontWeight: 700 }}>{error}</Typography>
                </Box>
            </Box>



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