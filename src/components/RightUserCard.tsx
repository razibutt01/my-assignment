
import React from 'react'
import { UserDataContext } from "../context/SelectedUserContext";
import { Box, Paper } from '@material-ui/core';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Create from './CreateEditForm';
type Props = {}
const useStyles = makeStyles({
    head: {

        height: "100vh", width: "100%",
        marginLeft: "20px"
    },
    heading: {
        margin: "2px 0px 20px 5px ",
        borderBottom: "1px solid #808080"
    },
    table: {
        height: "90vh", width: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    }
})
const RightUserCard = (props: Props) => {
    const { selectedUser } = React.useContext(UserDataContext);
    console.log(selectedUser)
    const classes = useStyles()
    return (
        <Box component={Paper} className={classes.head}>
            <Box className={classes.heading}>
                <Typography variant="h4" align='justify' style={{ fontWeight: 700, }}>
                    {selectedUser.firstName != "" ? selectedUser.firstName : "Select a User"}
                </Typography>
            </Box>
            {selectedUser.firstName != "" ?
                <Box className={classes.table}>
                    <Create />

                </Box>
                : <Typography variant="h6" align='justify' style={{ marginLeft: "5px" }}>
                    Select a user to Edit
                </Typography>}
        </Box>
    )
}

export default RightUserCard;