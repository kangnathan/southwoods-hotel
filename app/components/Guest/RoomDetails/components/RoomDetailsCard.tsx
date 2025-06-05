"use client"

import React from "react"
import { Box, Typography, Stack, Divider, Button } from "@mui/material"
import { useRouter } from "next/navigation"
import { useReservationStore } from "../store/useReservationStore"
import { useRoomRouteParams } from "@/app/components/Admin/Rooms/hooks/useRoomRouteParams"

interface RoomDetailsProps {
  number?: string
  type?: string
  price?: number
  capacity?: number
}

export const RoomDetailsCard = ({
  number,
  type,
  price,
  capacity,
}: RoomDetailsProps) => {
  const router = useRouter()
  const { roomId } = useRoomRouteParams()
  const { startDate, endDate } = useReservationStore()

  const handleBookNow = () => {
    if (startDate && endDate) {
      router.push(`/guest/rooms/${roomId}/checkout`)
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      gap={3}
      border="1px solid #e0e0e0"
      borderRadius={4}
      p={3}
      bgcolor="#fafafa"
    >
      <Typography
        variant="h5"
        fontWeight={500}
        color="text.primary"
        sx={{ mb: 1 }}
      >
        Room Details
      </Typography>

      <Divider sx={{ opacity: 0.3 }} />

      <Stack spacing={2.5}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "0.95rem" }}
          >
            Room Type
          </Typography>
          <Typography variant="body1" fontWeight={500} color="text.primary">
            {type}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "0.95rem" }}
          >
            Room Number
          </Typography>
          <Typography variant="body1" fontWeight={500} color="text.primary">
            {number}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "0.95rem" }}
          >
            Capacity
          </Typography>
          <Typography variant="body1" fontWeight={500} color="text.primary">
            {capacity} {capacity === 1 ? "guest" : "guests"}
          </Typography>
        </Box>

        <Divider sx={{ opacity: 0.2, my: 1 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="text.secondary" fontWeight={400}>
            Price per night
          </Typography>
          <Typography variant="h5" fontWeight={600} color="primary.main">
            ${price}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleBookNow}
          disabled={!startDate || !endDate}
        >
          Book Now
        </Button>
      </Stack>
    </Box>
  )
}
