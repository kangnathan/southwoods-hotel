import { create } from "zustand"
import { Dayjs } from "dayjs"

interface BookingState {
  startDate: Dayjs | null
  endDate: Dayjs | null
  setStartDate: (date: Dayjs | null) => void
  setEndDate: (date: Dayjs | null) => void
  reset: () => void
}

export const useReservationStore = create<BookingState>((set) => ({
  startDate: null,
  endDate: null,
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  reset: () => set({ startDate: null, endDate: null }),
}))
