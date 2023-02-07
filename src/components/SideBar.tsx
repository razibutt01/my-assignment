import React from 'react'
import { Box, Button, Paper } from '@material-ui/core'
import { HiUserGroup, HiClipboard } from 'react-icons/hi';
import { makeStyles } from '@mui/styles';
import Container from '@mui/system/Container';
import FormRoleDialog from './FormRoleDialog';
import FormUserDialog from './FormUserDialog';
type Props = {
    selectedButton: "manageUser" | "manageRole";
    setSelectedButton: React.Dispatch<React.SetStateAction<"manageUser" | "manageRole">>
}
const useStyles = makeStyles({
    layout: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "65px",
        flexWrap: "wrap"
    },
    cont: {
        height: "100vh",
        // maxWidth: "120px"
    }
})
const SideBar = ({ selectedButton, setSelectedButton }: Props) => {
    const classes = useStyles()
    return (
        <Container className={classes.cont}>

            <Box component={Paper} className={classes.layout}>
                <Box style={{ borderBottom: "1px solid black" }}>
                    {selectedButton === "manageUser" ? <FormUserDialog /> : <FormRoleDialog />}
                </Box>
                <Button onClick={() => setSelectedButton("manageUser")}>
                    <HiUserGroup title='Manage Users' size={50} />
                </Button>
                <Button onClick={() => setSelectedButton("manageRole")}>
                    <HiClipboard title="Manage Roles" size={50} />
                </Button>
            </Box>
        </Container>
    )
}

export default SideBar