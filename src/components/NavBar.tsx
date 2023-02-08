import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';


const useStyles: any = makeStyles({

    NotificationColor: {
        color: "white"
    }

})
const NavBar = () => {
    const classes = useStyles()
    return (
        <AppBar position="static"
            style={{

                backgroundColor: "#CC5500",
                marginBottom: "30px",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: "flex" }}>
                        <Image alt='logo' src="/SLQT.png" width={50} height={50} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                ml: 2,
                                pr: 1,
                                borderRight: "3px solid white",
                                fontWeight: 700,
                                color: 'white',
                                textDecoration: 'none',
                                alignSelf: "center"
                            }}
                        >
                            SelectCare
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                ml: 1,
                                fontWeight: 500,
                                color: 'white',
                                textDecoration: 'none',
                                alignSelf: "center"
                            }}
                        >
                            Senior {'>'} Admin
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Notifications">
                            <IconButton sx={{ p: 0 }}>
                                <NotificationsIcon className={classes.NotificationColor} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar