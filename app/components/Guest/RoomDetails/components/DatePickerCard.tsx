"use client"

import React, { useCallback } from "react"
import { Box, Typography, Paper, Divider } from "@mui/material"
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay"
import { useReservationStore } from "../store/useReservationStore"

const CustomDay = (props: PickersDayProps) => {
  return <PickersDay {...props} today={false} />
}

export const DatePickerCard: React.FC = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useReservationStore()

  const handleStartChange = useCallback(
    (date: Dayjs | null) => {
      setStartDate(date)
      if (endDate && date && date.isAfter(endDate)) {
        setEndDate(null)
      }
    },
    [endDate, setStartDate, setEndDate]
  )

  const handleEndChange = useCallback(
    (date: Dayjs | null) => {
      if (startDate && date && date.isBefore(startDate)) return
      setEndDate(date)
    },
    [startDate, setEndDate]
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Paper
          elevation={0}
          sx={{
            borderRadius: "20px",
            p: 4,
            width: "100%",
            maxWidth: 800,
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="h5"
            mb={3}
            textAlign="center"
            fontWeight="medium"
            color="primary"
          >
            Select Date Range
          </Typography>

          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={3}
            justifyContent="center"
          >
            <Box
              flex={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="subtitle1" mb={2}>
                Start Date
              </Typography>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={startDate}
                onChange={handleStartChange}
                slots={{ day: CustomDay }}
                slotProps={{ actionBar: { actions: [] } }}
              />
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ minHeight: { md: 300 } }}
            >
              <Divider orientation="vertical" flexItem />
            </Box>

            <Box
              flex={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="subtitle1" mb={2}>
                End Date
              </Typography>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={endDate}
                onChange={handleEndChange}
                minDate={startDate || undefined}
                disabled={!startDate}
                slots={{ day: CustomDay }}
                slotProps={{ actionBar: { actions: [] } }}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </LocalizationProvider>
  )
}
