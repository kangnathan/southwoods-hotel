"use client"
import React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { useRouter } from "next/navigation"

export const AdminNavbar = () => {
  const router = useRouter()

  const handleSignout = () => {
    router.push("/sign-out")
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Box>
          <Button color="inherit" onClick={handleSignout}>
            Sign Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
