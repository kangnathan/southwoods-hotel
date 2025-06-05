"use client"
import { Stack, Box } from "@mui/material"
import { ReservationCard } from "./components/ReservationCard"
import { useState, useCallback, useEffect, useMemo } from "react"
import { reservationFindMany } from "@/app/api/reservation/queries"
import { useRouter } from "next/navigation"
import { Reservation } from "@prisma/client"

// Define reservation status types that match your actual reservation statuses
const RESERVATION_STATUSES = [
  "ALL",
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
] as const

type ReservationStatus = (typeof RESERVATION_STATUSES)[number]

// Status configuration for enhanced styling
const STATUS_CONFIG = {
  ALL: {
    label: "All",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    hoverGradient: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
    shadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
  },
  PENDING: {
    label: "Pending",
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    hoverGradient: "linear-gradient(135deg, #ffd89b 0%, #f9a185 100%)",
    shadow: "0 4px 15px rgba(252, 182, 159, 0.4)",
  },
  CONFIRMED: {
    label: "Confirmed",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    hoverGradient: "linear-gradient(135deg, #9ae6e2 0%, #fcc4d6 100%)",
    shadow: "0 4px 15px rgba(168, 237, 234, 0.4)",
  },
  COMPLETED: {
    label: "Completed",
    gradient: "linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)",
    hoverGradient: "linear-gradient(135deg, #b1d4b9 0%, #cfe8ce 100%)",
    shadow: "0 4px 15px rgba(193, 223, 196, 0.4)",
  },
  CANCELLED: {
    label: "Cancelled",
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    hoverGradient: "linear-gradient(135deg, #ff8a8f 0%, #fdbde2 100%)",
    shadow: "0 4px 15px rgba(255, 154, 158, 0.4)",
  },
} as const

export const GuestReservations = () => {
  const [reservationsData, setReservationsData] = useState<
    Reservation[] | null
  >(null)
  const [selectedStatus, setSelectedStatus] = useState<ReservationStatus>("ALL")

  const router = useRouter()

  const fetchReservations = useCallback(async () => {
    try {
      const data = await reservationFindMany()
      setReservationsData(data)
    } catch (error) {
      console.error("Failed to fetch reservations:", error)
      setReservationsData([])
    }
  }, [])

  useEffect(() => {
    fetchReservations()
  }, [fetchReservations])

  const reservations = useMemo(() => {
    if (!reservationsData) return []
    return selectedStatus === "ALL"
      ? reservationsData
      : reservationsData.filter(
          (reservation) => reservation.status === selectedStatus
        )
  }, [reservationsData, selectedStatus])

  // Get reservation count for each status
  const getStatusCount = useCallback(
    (status: ReservationStatus) => {
      if (!reservationsData) return 0
      if (status === "ALL") return reservationsData.length
      return reservationsData.filter((r) => r.status === status).length
    },
    [reservationsData]
  )

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: { xs: "center", sm: "flex-start" },
          my: 4,
          p: 1,
        }}
      >
        {RESERVATION_STATUSES.map((status) => {
          const config = STATUS_CONFIG[status]
          const count = getStatusCount(status)
          const isSelected = selectedStatus === status

          return (
            <Box
              key={status}
              onClick={() => setSelectedStatus(status)}
              sx={{
                position: "relative",
                cursor: "pointer",
                borderRadius: "50px",
                overflow: "hidden",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isSelected
                  ? "translateY(-2px) scale(1.02)"
                  : "translateY(0) scale(1)",
                "&:hover": {
                  transform: "translateY(-3px) scale(1.03)",
                },
                "&:active": {
                  transform: "translateY(-1px) scale(0.98)",
                },
              }}
            >
              {/* Animated background gradient */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: isSelected
                    ? config.gradient
                    : "rgba(255, 255, 255, 0.1)",
                  transition: "all 0.4s ease",
                  "&:hover": {
                    background: config.hoverGradient,
                  },
                }}
              />

              {/* Glass morphism overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: isSelected
                    ? "rgba(255, 255, 255, 0.15)"
                    : "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  border: isSelected
                    ? "1px solid rgba(255, 255, 255, 0.3)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "50px",
                  transition: "all 0.3s ease",
                }}
              />

              {/* Content */}
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 3,
                  py: 1.5,
                  color: isSelected ? "#ffffff" : "#333333",
                  fontWeight: isSelected ? 700 : 600,
                  fontSize: "0.9rem",
                  letterSpacing: "0.025em",
                  textShadow: isSelected ? "0 1px 3px rgba(0,0,0,0.3)" : "none",
                  transition: "all 0.3s ease",
                }}
              >
                <span>{config.label}</span>

                {/* Count badge */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: isSelected
                      ? "rgba(255, 255, 255, 0.25)"
                      : "rgba(0, 0, 0, 0.1)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: isSelected ? "#ffffff" : "#666666",
                    border: isSelected
                      ? "1px solid rgba(255, 255, 255, 0.3)"
                      : "1px solid rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {count}
                </Box>
              </Box>

              {/* Enhanced shadow for selected state */}
              {isSelected && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80%",
                    height: "20px",
                    background: config.gradient,
                    filter: "blur(15px)",
                    opacity: 0.6,
                    borderRadius: "50%",
                  }}
                />
              )}
            </Box>
          )
        })}
      </Box>

      <Stack spacing={2}>
        {reservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            onClick={() => router.push(`/guest/reservations/${reservation.id}`)}
          />
        ))}
      </Stack>
    </>
  )
}
