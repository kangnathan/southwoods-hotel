"use client"

import { useMemo, useState, useEffect } from "react"
import { Box, Stack, Typography } from "@mui/material"

import RoomDetailsPictureCard from "@/app/components/Guest/RoomDetails/components/RoomDetailsPictureCard"
import { RoomDetailsCardSkeleton } from "./components/RoomDetailsPictureCardSkeleton"
import { CommentsBox } from "@/app/components/Guest/RoomDetails/components/Comments"
import { RoomCardDisplay } from "@/app/components/Guest/Rooms/types"
import { DatePickerCard } from "./components/DatePickerCard"
import { useRoomRouteParams } from "@/app/components/Admin/Rooms/hooks/useRoomRouteParams"
import { RoomDetailsCard } from "./components/RoomDetailsCard"
import { useReservationStore } from "./store/useReservationStore"

export default function RoomDetails() {
  const [userId, setUserId] = useState<number | null>(null)
  const [roomData, setRoomData] = useState<RoomCardDisplay | null>(null)
  const { roomId } = useRoomRouteParams()
  const { setStartDate, setEndDate } = useReservationStore()

  // Clear dates on component mount and when roomId changes
  useEffect(() => {
    setStartDate(null)
    setEndDate(null)
  }, [roomId, setStartDate, setEndDate])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user")
        if (!res.ok) throw new Error("Unauthorized or error fetching user")
        const data = await res.json()
        setUserId(Number(data.id))
      } catch (error) {
        console.error("Failed to fetch user:", error)
        setUserId(null)
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomId) return
      try {
        const res = await fetch(`/api/room/${roomId}`)
        if (!res.ok) throw new Error("Failed to fetch room")
        const data = await res.json()
        setRoomData(data)
      } catch (error) {
        console.error("Failed to fetch room data:", error)
        setRoomData(null)
      }
    }

    fetchRoom()
  }, [roomId])

  const room = useMemo(() => {
    if (!roomData) return null
    return {
      id: roomData.id,
      image: roomData.image ?? "",
      name: roomData.name ?? "",
      number: roomData.number ?? "",
      price: roomData.price ?? 0,
      status: roomData.status ?? "-",
      type: roomData.type ?? "-",
      favorites: roomData.favorites,
      capacity: roomData.capacity,
    }
  }, [roomData])

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: "center", mb: 3 }}
      >
        {room?.name}
      </Typography>

      <Box marginBottom={"30px"}>
        {room ? (
          <RoomDetailsPictureCard {...room} />
        ) : (
          <RoomDetailsCardSkeleton />
        )}
      </Box>

      <Stack spacing={3.5} direction={"row"} marginBottom={"25px"}>
        <DatePickerCard />
        <RoomDetailsCard
          type={room?.type}
          price={room?.price}
          capacity={room?.capacity}
          number={room?.number}
        />
      </Stack>

      <CommentsBox roomId={room?.id ?? 0} userId={userId ?? 0} />
    </>
  )
}
