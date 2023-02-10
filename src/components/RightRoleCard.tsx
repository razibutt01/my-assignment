import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import { RoleDataContext } from '@/context/SelectedRoleContext';
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
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

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function styleProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function RightRoleCard() {
    const [value, setValue] = React.useState(0);
    const { selectedUnassignUser, selectedAssignUser } = React.useContext(RoleDataContext);
    const classes = useStyles()
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <Box component={Paper} className={classes.head}>
            <Box className={classes.heading}>
                <Typography variant="h4" align='justify' style={{ fontWeight: 700, }}>
                    Select a Role
                </Typography>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                    <Tab label="Assigned" {...styleProps(0)} style={{ width: "50%" }} />
                    <Tab label="Unassigned" {...styleProps(1)} style={{ width: "50%" }} />

                </Tabs>
            </Box>


            {selectedAssignUser.firstName != "" ?
                <TabPanel value={value} index={0}>
                    {selectedAssignUser.firstName + "" + selectedAssignUser.lastName}
                </TabPanel>



                : <TabPanel value={value} index={0}>
                    Select a Role
                </TabPanel>}
            {selectedUnassignUser[0].firstName != "" ? selectedUnassignUser.map((unassignUser) => (
                <TabPanel value={value} index={1} key={unassignUser.id}>
                    {unassignUser.firstName + "" + unassignUser.lastName}
                </TabPanel>


            ))
                : <TabPanel value={value} index={1}>
                    Select a Role
                </TabPanel>}

        </Box>
    );
}