import React from 'react'
import { useRolesContext } from '@/hooks/useRolesContext';
import useRole from '@/hooks/useRole';
import { DataGrid, GridColDef, GridEditCellProps, GridRowsProp } from '@mui/x-data-grid';
import { Box, Paper } from '@material-ui/core';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { RoleDataContext } from '@/context/SelectedRoleContext';
type Props = {}
const useStyles = makeStyles({
    head: {
        height: "100%", width: "100%",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap"
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
interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}
const RoleNameCell = (props: GridEditCellProps) => {
    const { setSelectedUnassignUser, setSelectedAssignUser } = React.useContext(RoleDataContext);
    function handleRowClick(id: number) {
        fetch("http://localhost:8000/roles_users", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            },
        }).then(res => res.json())
            .then((data) => {

                const filteredData = data.filter((d: { id: number, roleId: number, userId: number }) => d.roleId == id)
                fetch(" http://localhost:8000/users/" + filteredData[0].userId, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                    },
                }).then(res => res.json()).then((data) => setSelectedAssignUser(data))
                fetch(" http://localhost:8000/users", {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                    },
                }).then(res => res.json()).then((data) => setSelectedUnassignUser(() => data.filter((d: { id: number, roleId: number, userId: number }) => d.id != filteredData[0].userId)))

            }
            );
    }


    // async function handleRole() {
    //    
    //     } else {
    //         handleRole()

    //     }


    // }



    return (
        <Button onClick={() => handleRowClick(props.row.id)}>
            {props.row.col1}
        </Button>
    );
};
const LeftCard = (props: Props) => {
    const { state, dispatch } = useRolesContext()
    const { data, isPending, error } = useRole()
    React.useEffect(() => {
        // console.log("hello")
        // const fetchWorkouts = async () => {
        //     const response = await setUser()
        dispatch({ type: 'SET_ROLES', payload: data })

        //     if (response) {
        //         console.log(response)
        //     }
        // }
        // fetchWorkouts()

    }, [data, dispatch])
    const columns: GridColDef[] = [
        { field: 'col1', headerName: 'Roles', renderCell: RoleNameCell, headerClassName: "super-app-theme--header", width: 630 },
    ];
    const rows: GridRowsProp = Array.isArray(state.roles)
        ? state.roles.map((role) => (
            { id: role.id, col1: (role.title) }
        ))
        : [];
    const classes = useStyles()
    if (isPending) {
        return (
            <Box component={Paper} className={classes.head}>
                <Box className={classes.heading}>
                    <Typography variant="h4" align='justify' style={{ fontWeight: 700, }}>
                        Manage Roles
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
                        Manage Roles
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
                    Manage Roles
                </Typography>
            </Box>
            <Box className={classes.table}>

                <DataGrid rows={rows} columns={columns} />
            </Box>
        </Box>
    )
}

export default LeftCard