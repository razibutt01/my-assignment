import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper } from '@material-ui/core';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LazyLoad from './LazyLoad';
import useRole from '@/hooks/useRole';
import { useRolesContext } from '@/hooks/useRolesContext';
import { RoleDataContext } from '@/context/SelectedRoleContext';
import { apiFetch } from './apiFetch';
import type { GridColDef, GridEditCellProps, GridRowsProp } from '@mui/x-data-grid';


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

const RoleNameCell = (props: GridEditCellProps) => {
    const { setSelectedUnassignUser, setSelectedAssignUser } = React.useContext(RoleDataContext);
    const [isPending, setPending] = React.useState(true)
    async function handleRowClick(id: number) {
        try {
            setPending(true);
            const data = await apiFetch("http://localhost:8000/roles_users", {
                method: "GET",
            });
            const filteredData = data.filter((d: { id: number, roleId: number, userId: number }) => d.roleId == id)

            const assignData = await apiFetch(" http://localhost:8000/users/" + filteredData[0].userId, {
                method: "GET",
            });
            setSelectedAssignUser(assignData);

            const unassignData = await apiFetch(" http://localhost:8000/users", {
                method: "GET",
            });
            setSelectedUnassignUser(() => unassignData.filter((d: { id: number, roleId: number, userId: number }) => d.id != filteredData[0].userId));
            setPending(false);
        } catch (err) {
            console.error(err);
            setPending(false);
        }
    }

    return (
        <Button onClick={() => handleRowClick(props.row.id)}>
            {props.row.col1}
        </Button>
    );
};

const LeftCard = () => {
    const { state, dispatch } = useRolesContext()
    const { data, isPending, error } = useRole()
    React.useEffect(() => {
        dispatch({ type: 'SET_ROLES', payload: data })

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