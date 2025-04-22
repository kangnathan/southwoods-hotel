"use client"
import React from "react"
import {
  AppBar,
  Box,
  CssBaseline,
  Button,
  Toolbar,
  Typography,
} from "@mui/material"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()

  const handleSignin = () => {
    if (pathname === "/sign-in") {
      router.push("/")
    } else {
      router.push("/sign-in")
    }
  }

  const handleSignout = () => {
    router.push("/sign-out")
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MUI
          </Typography>
          {!user ? (
            <Button variant="contained" color="primary" onClick={handleSignin}>
              {pathname === "/sign-in" ? "Back" : "Sign In"}
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSignout}>
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3, width: "100%" }}>
        <Toolbar />
      </Box>
    </Box>
  )
}
