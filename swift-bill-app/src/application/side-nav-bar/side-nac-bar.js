import React, { useEffect, useState } from "react"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Link } from "react-router-dom"
import "./side-nav-bar.css"
import "@fontsource/roboto"


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
      {/* Create new invoice */}
      <MenuItem itemName={"New Invoice"} path="/">
        <ListItemIcon>
          <ReceiptIcon color="action" />
        </ListItemIcon>
        <ListItemText primary="New Invoice" />
      </MenuItem>
      {/*View Invoice*/}
      <MenuItem itemName={"View Invoice"} path="/view">
        <ListItemIcon>
          <VisibilityIcon color="action" />
        </ListItemIcon>
        <ListItemText primary="View Invoice" />
      </MenuItem>
      {/*Over-Write exsisting Invoice*/}
      <MenuItem itemName={"Edit Invoice"} path="/edit">
        <ListItemIcon>
          <EditNoteIcon  color="action" />
        </ListItemIcon>
        <ListItemText primary="Edit Invoice" />
      </MenuItem>
    </List>
  )
}

export default SideNavbar
