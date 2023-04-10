import React, { useEffect, useState } from "react"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Collapse from "@mui/material/Collapse"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import "./side-nav-bar.css"
import {
  Analytics,
  Dashboard,
  SupervisorAccount,
  Computer,
  DesignServices,
  AccountTree,
  Addchart,
  Add,
} from "@mui/icons-material"
import "@fontsource/roboto"

/**
 * Component to create DropDown
 * @param {*} props
 * @returns
 * @private
 */
const DropwDown = (props) => {
  const [open, setOpen] = useState(props.isOpen)

  const dropdownHandler = (state) => {
    setOpen(!state)
  }

  return (
    <>
      <ListItemButton onClick={() => dropdownHandler(open)}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.menu} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {props.children}
      </Collapse>
    </>
  )
}

/**
 * Component for Side navigation bar
 * @returns
 */
const SideNavbar = () => {
  const [selected, setSelected] = useState("New Invoice")

  const MenuItem = (props) => {
    useEffect(() => {
      const storedSelectedOption =
        sessionStorage.getItem("selected") || "New Invoice" // if page get refereshed, retrive the information of active ListItem from local storage
      setSelected(storedSelectedOption)
    }, [])

    /**
     * set the current ListItem as active and store the information in local storage
     * @funtion handleItemClick
     * @param {Integer} value - value of selected listItem.
     */
    const handleItemClick = (value) => {
      setSelected(value)
      sessionStorage.setItem("selected", value)
    }

    return (
      <>
        <ListItemButton
          onClick={() => handleItemClick(props.itemName)}
          selected={selected === props.itemName}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "white",
              color: "blue",
            },
          }}
          component={Link}
          to={props.path === undefined && props.path === "" ? "/" : props.path}
        >
          {props.children}
        </ListItemButton>
      </>
    )
  }

  return (
    <List
      sx={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        height: "100%",
        boxShadow: 12,
        overflow: "auto",
      }}
      position="relative"
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {/* Go to Dashboard page */}
      <MenuItem itemName={"New Invoice"} path="/">
        <ListItemIcon>
          <Dashboard color="action" />
        </ListItemIcon>
        <ListItemText primary="New Invoice" />
      </MenuItem>
      {/* Go to Build Sheriff management page*/}
      <MenuItem itemName={"Add Client"} path="/">
        <ListItemIcon>
          <SupervisorAccount color="action" />
        </ListItemIcon>
        <ListItemText primary="Add Client" />
      </MenuItem>

      {/* Go to Machine management page*/}
      <MenuItem itemName={"View Invoice"} path="/">
        <ListItemIcon>
          <Computer color="action" />
        </ListItemIcon>
        <ListItemText primary="View Invoice" />
      </MenuItem>

      {/* Go to PR History management page*/}
      <MenuItem itemName={"Edit Invoice"} path="/">
        <ListItemIcon>
          <AccountTree color="action" />
        </ListItemIcon>
        <ListItemText primary="Edit Invoice" />
      </MenuItem>
    </List>
  )
}

export default SideNavbar
