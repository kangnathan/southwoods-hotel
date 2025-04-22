"use client"

import React, { useState } from "react"
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Toolbar,
} from "@mui/material"
import { Home, Info, Settings, Menu, ChevronLeft } from "@mui/icons-material"
import { useRouter } from "next/navigation"

const drawerWidth = 240

const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const router = useRouter()

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const navItems = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "About", icon: <Info />, path: "/about" },
    { text: "Settings", icon: <Settings />, path: "/settings" },
  ]

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 60,
          transition: "width 0.3s",
          overflowX: "hidden",
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar sx={{ justifyContent: open ? "flex-end" : "center" }}>
        <IconButton onClick={toggleDrawer}>
          {open ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => router.push(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {open && <ListItemText primary={item.text} />}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar
