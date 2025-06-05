"use client"

import { DataGrid } from "@mui/x-data-grid"
import { TextField, Typography, Box, Paper, Stack } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { reservationFindMany } from "@/app/api/reservation/queries"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Reservation } from "./types"

export const ReservationsTable = () => {
  const router = useRouter()
  const [search, setSearch] = useState("")

  const { data: reservationsData } = useQuery({
    queryKey: ["reservations"],
    queryFn: reservationFindMany,
  })

  const reservations = useMemo(() => {
    return (
      reservationsData?.map((reservation: Reservation) => ({
        id: reservation.id,
        user: reservation.user,
        room: reservation.room,
        checkInDate: reservation.checkInDate,
        checkOutDate: reservation.checkOutDate,
        status: reservation.status,
        totalAmount: reservation.totalAmount,
        firstName: reservation.user?.firstName || "",
        lastName: reservation.user?.lastName || "",
      })) || []
    )
  }, [reservationsData])

  const filteredReservations = useMemo(() => {
    const s = search.toLowerCase()
    return reservations.filter((reservation: Reservation) => {
      const hasFirstName =
        reservation.user?.firstName?.toLowerCase().includes(s) || false
      const hasLastName =
        reservation.user?.lastName?.toLowerCase().includes(s) || false
      const hasStatus = reservation.status.toLowerCase().includes(s)
      const hasStatusString = reservation.status.toString().includes(s)
      return hasFirstName || hasLastName || hasStatus || hasStatusString
    })
  }, [reservations, search])

  const handleRoomClick = (reservationId: number) => {
    router.push(`/admin/reservations/${reservationId}/update`)
  }

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "totalAmount", headerName: "Amount", flex: 1 },
  ]

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
          Reservations
        </Typography>
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
          rows={filteredReservations}
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
