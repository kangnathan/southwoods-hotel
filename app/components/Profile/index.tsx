"use client"

import { useEffect, useState } from "react"
import {
  Typography,
  Stack,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material"
import { PersonRounded, EmailRounded, PhoneRounded } from "@mui/icons-material"
import { UserRole } from "@prisma/client"

type User = {
  firstName: string
  lastName: string
  email: string
  phone: string
  role: UserRole
}

export const ProfileDetails = () => {
  const [user, setUser] = useState<User>()
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user")
        if (!res.ok) throw new Error("Failed to fetch user data")
        const data = await res.json()
        setUser(data)
      } catch (err) {
        setError("Could not load profile data")
        console.error(err)
      }
    }

    fetchUser()
  }, [])

  const handleChange = (field: keyof User, value: string) => {
    setUser((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    setSuccessMessage("")
    setError("")

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        }),
      })

      if (!res.ok) throw new Error("Failed to save user data")
      const updatedUser = await res.json()
      setUser(updatedUser)
      setSuccessMessage("Profile updated successfully")
    } catch (err) {
      console.error(err)
      setError("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  if (!user) {
    return (
      <Stack justifyContent="center" alignItems="center" height={200}>
        <CircularProgress />
      </Stack>
    )
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        mx: "auto",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack gap={4}>
        <Typography variant="h5" fontWeight={600} color="text.primary">
          Profile Details
        </Typography>

        {error && (
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ borderRadius: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Stack direction={"row"} gap={3}>
          <TextField
            label="First Name"
            value={user.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonRounded color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />

          <TextField
            label="Last Name"
            value={user.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonRounded color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "action.hover",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Account Role: {user.role}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} gap={3}>
          {" "}
          <TextField
            label="Phone Number"
            type="tel"
            value={user.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneRounded color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />
          <TextField
            label="Email Address"
            type="email"
            value={user.email}
            onChange={(e) => handleChange("email", e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailRounded color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />
        </Stack>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
          size="large"
          sx={{
            borderRadius: 2,
            py: 1.5,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 500,
            bgcolor: "#101011",
          }}
        >
          {saving ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </Stack>
    </Paper>
  )
}
