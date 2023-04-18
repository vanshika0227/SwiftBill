import React from "react"
import Footer from "../footer/Footer"
import Header from "../header/Header"
import SideNavbar from "../side-nav-bar/side-nac-bar"
import "@fontsource/roboto"
import { Grid, Container } from "@mui/material"
import { Outlet, useLocation} from "react-router-dom"
import ErrorBoundary from "../errorBoundary/ErrorBoundary"
import Paper from "@mui/material/Paper"
import "./Home.css"

const Home = () => {
  /* Render */
  return (
    <Container maxWidth={false} className="build">
        <Grid container>
        <Grid item lg={12} md={12} sm={12}>
            <Header />
        </Grid>
        <Grid item lg={2} md={2} sm={2} xs={2}>
            <SideNavbar/>
        </Grid>
        <Grid item lg={10} md={10} sm={10} xs={10}>
            <ErrorBoundary key={useLocation().pathname}>
                <Outlet />
            </ErrorBoundary>
        </Grid>
        <Grid item lg={12} md={12} sm={12}>
            <Paper sx={{ position: 'relative', bottom: 0, left: 0, right: 0 }}>
                <Footer />
            </Paper>
        </Grid>
        </Grid>
    </Container>
    
  )
}

export default Home;
