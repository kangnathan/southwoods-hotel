"use client"

// import { useForm } from "react-hook-form"
import {
  Box,
  // Button,
  // Typography,
  // Stack,
  // Alert,
  CircularProgress,
  // Paper,
  // TextField,
  // CardMedia,
  // Divider,
  Container,
  CardMedia,
} from "@mui/material"
import { useReservationStore } from "@/app/components/Guest/RoomDetails/store/useReservationStore"
import { useRouter } from "next/navigation"
import { useCallback, useState, useEffect } from "react"
import { useRoomRouteParams } from "@/app/components/Admin/Rooms/hooks/useRoomRouteParams"
import { RoomCardDisplay } from "@/app/components/Guest/Rooms/types"
import { calculateBookingAmount } from "@/app/components/Guest/utils/calculateBookingAmount"
import { ReservationStatus } from "@prisma/client"
import { toast } from "@/app/components/_common/Toast"
import {
  Person,
  Mail,
  Phone,
  CreditCard,
  Check,
  X,
  Warning,
} from "@mui/icons-material"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  description: string
}

interface ReservationPayload {
  userId: number
  roomId: number
  status: "PENDING" | "CONFIRMED" | "CANCELLED"
  checkInDate: string
  checkOutDate: string
  totalAmount: number
}

interface ConflictingReservation {
  id: string
  checkInDate: string
  checkOutDate: string
  status: string
}

export default function CheckoutPage() {
  const [user, setUser] = useState<User | null>(null)
  const [room, setRoom] = useState<RoomCardDisplay | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [conflictingReservations, setConflictingReservations] = useState<
    ConflictingReservation[]
  >([])

  const { roomId } = useRoomRouteParams()
  const { startDate, endDate, setStartDate, setEndDate } = useReservationStore()
  // const { handleSubmit } = useForm()
  const router = useRouter()

  // Fetch user data
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/user")
      if (!res.ok) throw new Error("Failed to fetch user data")
      const userData = await res.json()
      setUser(userData)
    } catch (err) {
      console.error("Failed to fetch user:", err)
      setError("Failed to load user information")
    }
  }, [])

  // Fetch room data
  const fetchRoom = useCallback(async () => {
    if (!roomId) return

    try {
      const res = await fetch(`/api/room/${roomId}`)
      if (!res.ok) throw new Error("Failed to fetch room data")
      const roomData = await res.json()
      setRoom(roomData)
    } catch (err) {
      console.error("Failed to fetch room:", err)
      setError("Failed to load room information")
    }
  }, [roomId])

  // Initialize data on mount
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true)
      await Promise.all([fetchUser(), fetchRoom()])
      setIsLoading(false)
    }

    initializeData()
  }, [fetchUser, fetchRoom])

  // Calculate total amount
  const totalAmount = calculateBookingAmount(
    startDate,
    endDate,
    room?.price ?? 0
  )

  // Validation checks
  const canSubmit =
    startDate && endDate && user?.id && roomId && totalAmount > 0

  const onSubmit = async () => {
    if (!canSubmit) {
      setError("Please ensure all required information is available")
      return
    }

    setIsLoading(true)
    setError(null)
    setConflictingReservations([])

    const payload: ReservationPayload = {
      userId: Number(user.id),
      roomId: Number(roomId),
      status: ReservationStatus.PENDING,
      checkInDate: startDate.toISOString(),
      checkOutDate: endDate.toISOString(),
      totalAmount,
    }

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json()

        // Handle conflict response specifically
        if (res.status === 409) {
          setError(
            errorData.error || "Room is not available for the selected dates"
          )
          if (errorData.conflictingReservations) {
            setConflictingReservations(errorData.conflictingReservations)
          }
          toast.error("Room is not available for the selected dates")
        } else {
          throw new Error(errorData.error || "Failed to create reservation")
        }
        return
      }

      toast.success("Reservation successful")
      router.push("/guest")
    } catch (err) {
      console.error("Booking error:", err)
      setError(
        err instanceof Error ? err.message : "Failed to complete booking"
      )
      toast.error("Failed to complete booking")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setStartDate(null)
    setEndDate(null)
    router.push("/guest")
  }

  if (isLoading && !user && !room) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress size={40} />
        </Box>
      </Container>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-light tracking-wide text-gray-900"></div>
            <div className="text-sm font-light text-gray-500">
              Secure Checkout
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extralight mb-4 tracking-tight">
            Checkout
          </h1>
          <div className="w-16 h-px bg-gray-400 mx-auto mb-6"></div>
          <p className="text-lg font-light text-gray-600">
            Complete your reservation
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-8 p-4 border border-red-200 bg-red-50 rounded-sm">
            <div className="flex items-center">
              <X className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-700 font-light">{error}</p>
            </div>
          </div>
        )}

        {/* Conflicting Reservations Alert */}
        {conflictingReservations.length > 0 && (
          <div className="mb-8 p-4 border border-amber-200 bg-amber-50 rounded-sm">
            <div className="flex items-start">
              <Warning className="w-5 h-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-amber-700 font-light mb-3">
                  The following reservations conflict with your selected dates:
                </p>
                <div className="space-y-2">
                  {conflictingReservations.map((reservation, index) => (
                    <div
                      key={reservation.id}
                      className="text-sm text-amber-600 bg-amber-100 p-2 rounded"
                    >
                      <span className="font-medium">
                        Reservation #{index + 1}:
                      </span>{" "}
                      {new Date(reservation.checkInDate).toLocaleDateString()} -{" "}
                      {new Date(reservation.checkOutDate).toLocaleDateString()}{" "}
                      ({reservation.status})
                    </div>
                  ))}
                </div>
                <p className="text-amber-700 font-light mt-3 text-sm">
                  Please select different dates or choose another room.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Guest Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-light mb-6 tracking-tight">
                Guest Information
              </h2>
              <div className="w-12 h-px bg-gray-300 mb-8"></div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-light text-gray-600 uppercase tracking-wide">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={user?.firstName || ""}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm font-light text-gray-900 focus:outline-none focus:border-gray-400"
                    />
                    <Person className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-light text-gray-600 uppercase tracking-wide">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={user?.lastName || ""}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm font-light text-gray-900 focus:outline-none focus:border-gray-400"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-light text-gray-600 uppercase tracking-wide">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm font-light text-gray-900 focus:outline-none focus:border-gray-400"
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-light text-gray-600 uppercase tracking-wide">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={user?.phone || ""}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm font-light text-gray-900 focus:outline-none focus:border-gray-400"
                  />
                  <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Summary */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-light mb-6 tracking-tight">
                Reservation Summary
              </h2>
              <div className="w-12 h-px bg-gray-300 mb-8"></div>
            </div>

            <div className="border border-gray-200 rounded-sm overflow-hidden">
              {/* Room Image Placeholder */}

              <CardMedia
                component="img"
                image={room?.image}
                alt={room?.name}
                sx={{
                  height: 240,
                  objectFit: "cover",
                }}
              />

              {/* Room Details */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-light mb-2">{room?.name}</h3>
                  <p className="text-gray-600 font-light">
                    {room?.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-light text-gray-600 uppercase tracking-wide">
                      Check-in
                    </span>
                    <span className="font-light">{`${startDate}`}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-light text-gray-600 uppercase tracking-wide">
                      Check-out
                    </span>
                    <span className="font-light">{`${endDate}`}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-light text-gray-600 uppercase tracking-wide">
                      Duration
                    </span>
                    <span className="font-light">
                      {endDate?.diff(startDate ?? endDate, "day") !== undefined
                        ? `${(endDate.diff(startDate!, "day") ?? 0) + 1} day(s)`
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-light text-gray-600 uppercase tracking-wide">
                      Rate per night
                    </span>
                    <span className="font-light">${room?.price}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-light">Total Amount</span>
                    <span className="text-2xl font-light">{`${totalAmount}`}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={onSubmit}
                disabled={isLoading || conflictingReservations.length > 0}
                className="w-full px-8 py-4 bg-gray-900 text-white font-light tracking-wide hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <CircularProgress
                      size={16}
                      sx={{ color: "white", mr: 1 }}
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Confirm Reservation
                  </>
                )}
              </button>

              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="w-full px-8 py-4 border border-gray-300 text-gray-900 font-light tracking-wide hover:border-gray-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel Reservation
              </button>
            </div>

            {/* Security Notice */}
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 font-light">
              <CreditCard className="w-4 h-4" />
              <span>Secure SSL encryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-32 py-16 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-light tracking-wide mb-8">
            Southwoods
          </div>
          <p className="font-light text-gray-500">
            © {new Date().getFullYear()} Southwoods Hotel. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
