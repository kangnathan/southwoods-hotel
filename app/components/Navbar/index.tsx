"use client"

import React from "react"
import {
  AppBar,
  Box,
  CssBaseline,
  Button,
  Toolbar,
  Container,
} from "@mui/material"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()

  const handleSignin = () => {
    router.push(pathname === "/sign-in" ? "/" : "/sign-in")
  }

  const handleSignout = () => {
    router.push("/sign-out")
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              py: 1,
              px: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="text-2xl font-light tracking-wide text-gray-900">
              Southwoods
            </div>

            {!user ? (
              <Button
                onClick={handleSignin}
                variant="outlined"
                sx={{
                  borderRadius: "0.75rem",
                  textTransform: "none",
                  fontWeight: 500,
                  borderColor: "#ccc",
                  color: "#333",
                  px: 3,
                  py: 1,
                  "&:hover": {
                    backgroundColor: "#f4f4f4",
                    borderColor: "#bbb",
                  },
                }}
              >
                {pathname === "/sign-in" ? "Back" : "Sign In"}
              </Button>
            ) : (
              <Button
                onClick={handleSignout}
                variant="contained"
                sx={{
                  borderRadius: "0.75rem",
                  textTransform: "none",
                  fontWeight: 500,
                  backgroundColor: "#111",
                  color: "#fff",
                  px: 3,
                  py: 1,
                  "&:hover": {
                    backgroundColor: "#000",
                  },
                }}
              >
                Sign Out
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
