"use client"

import { useEffect, useState } from "react"
import {
  Typography,
  Stack,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Paper,
  MenuItem,
} from "@mui/material"
import { ReservationStatus, Room } from "@prisma/client"
import { useResevationRouteParams } from "../hooks/useResevationRouteParams"

type Reservation = {
  id: number
  userId: number
  roomId: number
  room: Room
  checkInDate: string
  checkOutDate: string
  status: ReservationStatus
  totalAmount: number
}

export const ReservationUpdate = () => {
  const [reservation, setReservation] = useState<Reservation>()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")
  const { reservationId } = useResevationRouteParams()

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/reservation/${reservationId}`)
        if (!res.ok) throw new Error("Failed to fetch reservation")
        const data = await res.json()
        setReservation(data)
      } catch (err) {
        setError("Could not load reservation data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (reservationId) {
      fetchReservation()
    }
  }, [reservationId])

  const handleChange = (
    field: keyof Pick<Reservation, "checkInDate" | "checkOutDate" | "status">,
    value: string
  ) => {
    setReservation((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  const handleSave = async () => {
    if (!reservation) return
    setSaving(true)
    setSuccessMessage("")
    setError("")

    try {
      const res = await fetch(`/api/reservation/${reservationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: reservation.userId,
          roomId: reservation.roomId,
          status: reservation.status,
          checkInDate: reservation.checkInDate,
          checkOutDate: reservation.checkOutDate,
          totalAmount: reservation.totalAmount,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Failed to save reservation")
      }

      const updatedReservation = await res.json()
      setReservation(updatedReservation)
      setSuccessMessage("Reservation updated successfully")
    } catch (err) {
      console.error(err)
      setError(
        err instanceof Error ? err.message : "Failed to update reservation"
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" minHeight="200px">
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Loading reservation...
        </Typography>
      </Stack>
    )
  }

  if (!reservation) {
    return (
      <Alert severity="error">Reservation not found or failed to load.</Alert>
    )
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Update Reservation
      </Typography>

      <Stack spacing={3}>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Room"
          value={reservation.room?.name || "N/A"}
          disabled
          fullWidth
        />

        <TextField
          label="Check-in Date"
          type="date"
          value={reservation.checkInDate.split("T")[0]}
          onChange={(e) => handleChange("checkInDate", e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <TextField
          label="Check-out Date"
          type="date"
          value={reservation.checkOutDate.split("T")[0]}
          onChange={(e) => handleChange("checkOutDate", e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <TextField
          select
          label="Status"
          value={reservation.status}
          onChange={(e) => handleChange("status", e.target.value)}
          fullWidth
        >
          {Object.values(ReservationStatus).map((status) => (
            <MenuItem key={status} value={status}>
              {status
                .replace(/_/g, " ")
                .toLowerCase()
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Total Amount"
          type="number"
          value={reservation.totalAmount}
          disabled
          fullWidth
        />

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
          fullWidth
          size="large"
        >
          {saving ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Updating...
            </>
          ) : (
            "Update Reservation"
          )}
        </Button>
      </Stack>
    </Paper>
  )
}
