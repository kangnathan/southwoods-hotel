"use client"

import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  MenuItem,
  Menu,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material"
import { AccountCircle, Logout } from "@mui/icons-material"
import { useRouter } from "next/navigation"

export const GuestNavbar = () => {
  const router = useRouter()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfileClick = () => {
    router.push("/guest/profile")
  }

  const handleSignout = () => {
    router.push("/sign-out")
  }

  return (
    <AppBar
      position="sticky"
      elevation={3}
      sx={{
        borderRadius: 3,
        backgroundColor: "#2c2c34",
        color: "text.primary",
        // mx: "auto",
        my: 2,
        maxWidth: "100%",
        boxShadow: 3,
      }}
    >
      <Toolbar sx={{ px: 2 }}>
        <Typography
          variant="h6"
          fontWeight={600}
          letterSpacing={0.5}
          sx={{
            flexGrow: 1,
            color: "#ffffff",
          }}
        >
          Southwoods Hotel
        </Typography>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              p: 0.5,
              borderRadius: 2,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <AccountCircle sx={{ width: 32, height: 32, color: "#ffffff" }} />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 4,
            sx: {
              mt: 1.5,
              minWidth: 180,
              overflow: "visible",
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 16,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleProfileClick}>
            <Avatar sx={{ width: 28, height: 28, mr: 1 }} />
            Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleSignout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
