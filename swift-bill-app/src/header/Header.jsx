import React from "react"
import { AppBar, Box, Toolbar, IconButton, Typography, Badge } from "@mui/material"
import { Adb as AdbIcon, AccountCircle, Notifications as NotificationsIcon } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import ErrorBoundary from "../errorBoundary/ErrorBoundary"

export default function Header() {
  /* Components */
  const Account = () => {
    return (
      <IconButton size="large" edge="end" color="inherit"><AccountCircle /></IconButton>
    )
  }
  /* Disabled for now, comming soon */
  /* eslint-disable-next-line no-unused-vars */
  const Notifications = () => {
    return (
      <IconButton size="large" color="inherit">
        <Badge badgeContent={17} color="error"><NotificationsIcon /></Badge>
      </IconButton>
    )
  }

  /* Render */
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2E2E2E", maxHeight: "70px" }}>
      <Toolbar sx={{ margin: "0" }}>
        <AdbIcon sx={{ mr: 1 }} />
        <StyledTitle variant="h6" noWrap component="a" href="/" sx={{ letterSpacing: ".3rem" }}>Swift Bill</StyledTitle>
        <Box sx={{ flexGrow: 1 }} />
        <ErrorBoundary color="orange">
        </ErrorBoundary>
        {/* <Notifications /> */}
        <Account />
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