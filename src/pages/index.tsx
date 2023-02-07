import React from "react"
import { Box } from '@material-ui/core'
import LeftUserCard from "@/components/LeftUserCard";
import RightUserCard from '@/components/RightUserCard';
import SideBar from '@/components/SideBar'
import Head from 'next/head'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LeftRoleCard from '@/components/LeftRoleCard';
import RightRoleCard from "@/components/RightRoleCard";
import NavBar from "@/components/NavBar";

export default function Home() {
  const title = 'SelectCare | Senior > Admin';
  const [selectedButton, setSelectedButton] = React.useState<"manageUser" | "manageRole">("manageUser");
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/SLQT.png" />
      </Head>

      <Grid container justifyContent="center" spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>

        <Grid item xs={1} sm={1} md={1} >
          <SideBar selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
        </Grid>
        <Grid item xs={2} sm={5} md={5} >
          {selectedButton === "manageUser" ? <LeftUserCard /> : <LeftRoleCard />}
        </Grid>
        <Grid item xs={2} sm={4} md={5.5} >
          {selectedButton === "manageUser" ? <RightUserCard /> : <RightRoleCard />}
        </Grid>

      </Grid>
      {/* <Box
        style={{ display: "flex" }}
      >
        <Box>
          <SideBar selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
        </Box>
        <Box>
          {selectedButton === "manageUser" ? <LeftUserCard /> : <LeftRoleCard />}

        </Box>
        <Box>
          {selectedButton === "manageUser" ? <RightUserCard /> : <RightRoleCard />}
        </Box>
      </Box> */}

    </>
  )
}
