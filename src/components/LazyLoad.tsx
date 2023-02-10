import React from 'react'
import { Box, Paper } from '@material-ui/core';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

type Props = {
    state: string;
}
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
})

const LazyLoad = ({ state }: Props) => {
    const classes = useStyles()
    return (
        <Box component={Paper} className={classes.head}>
            <Box className={classes.heading}>
                <Typography variant="h4" align='justify' style={{ fontWeight: 700, }}>
                    Manage Roles
                </Typography>
            </Box>
            <Box style={{ margin: "100px auto" }}>

                <Typography variant="h5" style={{ fontWeight: 700 }}>{state}</Typography>
            </Box>
        </Box>

    )
}

export default LazyLoad