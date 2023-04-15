import React from "react"
import { AppBar, Toolbar, Typography} from "@mui/material"
import { Adb as AdbIcon } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import ErrorBoundary from "../errorBoundary/ErrorBoundary"

export default function Header() {

  /* Render */
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#00b0ff", maxHeight: "70px" }}>
      <Toolbar sx={{ margin: "0" }}>
        <AdbIcon sx={{ mr: 1 }} />
        <StyledTitle variant="h6" noWrap component="a" href="/" sx={{ letterSpacing: ".3rem" }}>Swift Bill</StyledTitle>
        <StyledTitle variant="h4" sx={{ paddingLeft: "15rem" }}>M/s. Shree Ganesh Plastic Pipe Factory</StyledTitle>
        
        <ErrorBoundary color="orange">
        </ErrorBoundary>
      </Toolbar>
    </AppBar>
  )
}

const StyledTitle = styled(Typography)(() => ({
  fontFamily: "monospace",
  fontWeight: 700,
  color: "inherit",
  textDecoration: "none"
}))