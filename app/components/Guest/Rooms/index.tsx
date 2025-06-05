"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import Grid from "@mui/material/Grid"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"
import RoomCard from "./components/RoomCard"
import { RoomCardSkeleton } from "./components/RoomCardSkeleton"
import { roomFindMany } from "@/app/api/room/queries"
import { RoomCardDisplay } from "./types"

const ROOM_TYPES = ["ALL", "REGULAR", "PREMIUM", "DELUXE", "EXECUTIVE"] as const
type RoomType = (typeof ROOM_TYPES)[number]

export const GuestRooms = () => {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<RoomType>("ALL")
  const [userId, setUserId] = useState<string | null>(null)
  const [roomsData, setRoomsData] = useState<RoomCardDisplay[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/user")
      if (!res.ok) throw new Error("Unauthorized or error fetching user")
      const data = await res.json()
      setUserId(data.id)
    } catch (error) {
      console.error("Failed to fetch user:", error)
      setUserId(null)
    }
  }, [])

  const fetchRooms = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await roomFindMany()
      setRoomsData(data)
    } catch (error) {
      console.error("Failed to fetch rooms:", error)
      setRoomsData([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
    fetchRooms()
  }, [fetchUser, fetchRooms])

  const rooms = useMemo(() => {
    if (!roomsData) return []
    return selectedType === "ALL"
      ? roomsData
      : roomsData.filter((room) => room.type === selectedType)
  }, [roomsData, selectedType])

  if (isLoading) {
    return <RoomCardSkeleton />
  }

  return (
    <>
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "start" },
          my: 3,
        }}
      >
        {ROOM_TYPES.map((type) => (
          <Chip
            key={type}
            label={type}
            clickable
            onClick={() => setSelectedType(type)}
            variant={selectedType === type ? "filled" : "outlined"}
            color={selectedType === type ? "primary" : "default"}
            sx={{
              borderRadius: "999px",
              fontWeight: 600,
              px: 2,
              py: 1,
              boxShadow:
                selectedType === type ? "0px 3px 6px rgba(0,0,0,0.1)" : "none",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
              },
            }}
          />
        ))}
      </Stack>

      <Grid container>
        {rooms.map((room) => (
          <Grid
            key={room.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
            sx={{ display: "flex", p: 1.5 }}
          >
            <RoomCard
              {...room}
              roomId={room.id}
              userId={Number(userId)}
              isFavorite={room.favorites.length > 0}
              onClick={() => router.push(`/guest/rooms/${room.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
