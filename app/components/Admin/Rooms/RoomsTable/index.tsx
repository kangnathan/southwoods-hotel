"use client"

import { DataGrid } from "@mui/x-data-grid"
import { TextField, Typography, Box, Paper, Button, Stack } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { roomFindMany } from "@/app/api/room/queries"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Room } from "./types"

interface ProcessedRoom {
  id: number
  name: string
  number: number
  price: number
  status: string
  type: string
}

export const RoomsTable = () => {
  const router = useRouter()
  const [search, setSearch] = useState("")

  const { data: roomsData } = useQuery({
    queryKey: ["rooms"],
    queryFn: roomFindMany,
  })

  const rooms = useMemo(() => {
    return (
      roomsData?.map((room: Room) => ({
        id: room.id,
        name: room.name,
        number: room.number,
        price: room.price,
        status: room.status,
        type: room.type,
      })) || []
    )
  }, [roomsData])

  const filteredRooms = useMemo(() => {
    const s = search.toLowerCase()
    return rooms.filter(
      (room: ProcessedRoom) =>
        room.name.toLowerCase().includes(s) ||
        room.number.toString().includes(s)
    )
  }, [rooms, search])

  const handleRoomClick = (roomId: number) => {
    router.push(`/admin/rooms/${roomId}/update`)
  }

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "number", headerName: "Room Number", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
  ]

  const handleClick = () => {
    router.push("/admin/rooms/create")
  }

  return (
    <Box
      sx={{
        maxWidth: "1000px",
        margin: "auto",
        padding: 4,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, color: "#333" }}>
          Rooms
        </Typography>

        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            backgroundColor: "#3f51b5",
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 2,
            px: 3,
            py: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            "&:hover": {
              backgroundColor: "#2c3e90",
            },
          }}
        >
          Create Room
        </Button>
      </Stack>

      <TextField
        label="Search by name or number"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 3,
          backgroundColor: "#fafafa",
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
      />

      <Paper
        elevation={2}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={filteredRooms}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          onRowClick={(params) => handleRoomClick(params.row.id)}
          sx={{
            border: "none",
            borderRadius: 3,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
              fontSize: "0.95rem",
            },
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid #f0f0f0",
              "&:hover": {
                backgroundColor: "#f9f9f9",
              },
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
          }}
        />
      </Paper>
    </Box>
  )
}
