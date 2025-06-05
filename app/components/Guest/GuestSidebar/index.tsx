"use client"

import React, { useState, ReactNode } from "react"
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Box,
  Tooltip,
  Fade,
  useMediaQuery,
} from "@mui/material"
import {
  MenuRounded,
  CloseRounded,
  EventNoteRounded,
  ReceiptLongRounded,
  MeetingRoomRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material"
import { useRouter, usePathname } from "next/navigation"
import { useTheme } from "@mui/material/styles"

const DRAWER_WIDTH_EXPANDED = 280
const DRAWER_WIDTH_COLLAPSED = 72

type SidebarProps = {
  children?: ReactNode
}

const GuestSidebar = ({ children }: SidebarProps) => {
  const [open, setOpen] = useState(true)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const navItems = [
    { text: "Rooms", icon: <MeetingRoomRounded />, path: "/guest" },
    {
      text: "Reservations",
      icon: <EventNoteRounded />,
      path: "/guest/reservations",
    },
    { text: "Bills", icon: <ReceiptLongRounded />, path: "/guest/bills" },
  ]

  const isActive = (path: string) => {
    return pathname === path
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderNavItem = (item: any) => (
    <Box key={item.text} sx={{ position: "relative", mb: 0.5 }}>
      <Tooltip title={!open ? item.text : ""} placement="right" arrow>
        <ListItemButton
          onClick={() => router.push(item.path)}
          onMouseEnter={() => setHoveredItem(item.text)}
          onMouseLeave={() => setHoveredItem(null)}
          sx={{
            borderRadius: 3,
            mx: 1.5,
            px: 2,
            py: 1.5,
            minHeight: 56,
            position: "relative",
            overflow: "hidden",
            background: isActive(item.path)
              ? `linear-gradient(135deg, #434245, #434245)`
              : "transparent",
            // border: isActive(item.path)
            //   ? `1px solid #64b5f6`
            //   : "1px solid transparent",
            transform:
              hoveredItem === item.text ? "translateX(4px)" : "translateX(0)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              backgroundColor: isActive(item.path) ? "#2196f3" : "#333",
              transform: "translateX(4px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            },
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 4,
              // backgroundColor: isActive(item.path) ? "#ffffff" : "transparent",
              borderRadius: "0 2px 2px 0",
              transition: "all 0.3s ease",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2.5 : "auto",
              justifyContent: "center",
              color: "#ffffff",
              transition: "all 0.3s ease",
            }}
          >
            {item.icon}
          </ListItemIcon>

          <Fade in={open} timeout={200}>
            <Box sx={{ flexGrow: 1, opacity: open ? 1 : 0 }}>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: isActive(item.path) ? 600 : 500,
                  color: "#ffffff",
                }}
              />
            </Box>
          </Fade>

          {open && isActive(item.path) && (
            <KeyboardArrowRightRounded
              sx={{
                color: "#ffffff",
                fontSize: 20,
                opacity: 0.8,
              }}
            />
          )}
        </ListItemButton>
      </Tooltip>
    </Box>
  )

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={() => isMobile && setOpen(false)}
        sx={{
          width: open ? DRAWER_WIDTH_EXPANDED : DRAWER_WIDTH_COLLAPSED,
          flexShrink: 0,
          whiteSpace: "nowrap",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
          "& .MuiDrawer-paper": {
            width: open ? DRAWER_WIDTH_EXPANDED : DRAWER_WIDTH_COLLAPSED,
            overflowX: "hidden",
            boxSizing: "border-box",
            backgroundColor: "#2c2c34",
            backdropFilter: "blur(20px)",
            borderRight: `1px solid ${theme.palette.divider}`,
            boxShadow: "0 0 40px rgba(0,0,0,0.1)",
            transition: theme.transitions.create(["width", "background"], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.standard,
            }),
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: open ? "right" : "center",
            p: 2,
            minHeight: 80,
            background: "#24242b",
          }}
        >
          <IconButton
            onClick={toggleDrawer}
            size="small"
            sx={{
              backgroundColor: theme.palette.action.hover,
              borderRadius: 2,
              p: 1,
              color: "#ffffff",
            }}
          >
            {open ? (
              <CloseRounded fontSize="small" />
            ) : (
              <MenuRounded fontSize="small" />
            )}
          </IconButton>
        </Box>

        <Divider sx={{ mx: 2, opacity: 0.3, backgroundColor: "#555" }} />

        <Box sx={{ flexGrow: 1, py: 2 }}>
          <List sx={{ px: 0 }}>{navItems.map(renderNavItem)}</List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
          marginLeft: isMobile ? 0 : undefined,
          bgcolor: "#f0ece2",
        }}
      >
        {isMobile && open && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: theme.zIndex.drawer - 1,
            }}
            onClick={() => setOpen(false)}
          />
        )}
        {children}
      </Box>
    </Box>
  )
}

export default GuestSidebar
