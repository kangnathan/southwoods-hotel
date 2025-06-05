"use client"

import { Box } from "@mui/material"
import { RoomsTable } from "@/app/components/Admin/Rooms/RoomsTable"

export default function RoomsPage() {
  return (
    <Box sx={{ maxWidth: "1000px", margin: "auto", px: 2, py: 4 }}>
      <RoomsTable />
    </Box>
  )
}
