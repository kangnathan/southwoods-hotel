import { FC } from "react"
import moment from "moment-timezone"
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Divider,
} from "@mui/material"
import { Reservation } from "@prisma/client"

type ReservationCardProps = {
  reservation: Reservation
  onClick?: () => void
}

const formatDate = (date: string) =>
  moment.tz(date, "Asia/Manila").format("MMM D, YYYY")

const statusColor = (status: string) => {
  const map: Record<string, string> = {
    confirmed: "#10b981", // green
    pending: "#f59e0b", // amber
    cancelled: "#ef4444", // red
  }
  return map[status.toLowerCase()] || "#6b7280"
}

export const ReservationCard: FC<ReservationCardProps> = ({
  reservation,
  onClick,
}) => {
  const { id, checkInDate, checkOutDate, status, totalAmount } = reservation

  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "grey.100",
        cursor: onClick ? "pointer" : "default",
        boxShadow: 2,
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: onClick ? 5 : 2,
          borderColor: "primary.light",
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        {/* Header Row */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2" fontWeight={600} color="text.primary">
            Reservation {id}
          </Typography>

          <Box
            sx={{
              px: 1.5,
              py: 0.25,
              borderRadius: 2,
              fontSize: "0.75rem",
              fontWeight: 600,
              color: statusColor(status),
              backgroundColor: `${statusColor(status)}20`,
              textTransform: "capitalize",
            }}
          >
            {status}
          </Box>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        {/* Room Info */}
        <Stack direction="row" spacing={2} alignItems="center">
          {/* {room.image ? (
            <Avatar
              variant="rounded"
              src={room.image}
              alt={room.title}
              sx={{ width: 64, height: 64 }}
            />
          ) : (
            <Avatar
              variant="rounded"
              sx={{
                width: 64,
                height: 64,
                bgcolor: "grey.200",
                fontSize: 18,
                fontWeight: 500,
                color: "text.secondary",
              }}
            >
              {room.title?.charAt(0).toUpperCase() || "R"}
            </Avatar>
          )} */}
          <Box>
            {/* <Typography fontWeight={600} color="text.primary">
              {room.name}
            </Typography> */}
            <Typography variant="body2" color="text.secondary">
              {formatDate(String(checkInDate))} –{" "}
              {formatDate(String(checkOutDate))}
            </Typography>
          </Box>
        </Stack>

        {/* Total */}
        <Box textAlign="right" mt={2}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontSize="0.75rem"
          >
            Total Amount
          </Typography>
          <Typography
            variant="h6"
            color="primary.main"
            fontWeight={700}
            fontSize="1.25rem"
          >
            ₱
            {totalAmount.toLocaleString("en-PH", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
