import { Dayjs } from "dayjs"

export function calculateBookingAmount(
  startDate: Dayjs | null,
  endDate: Dayjs | null,
  nightlyRate: number
): number {
  // 🛡️ Early exit if either date is null
  if (!startDate || !endDate) return 0

  if (!startDate.isValid() || !endDate.isValid()) {
    throw new Error("Invalid date format")
  }

  const nights = endDate.diff(startDate, "day")
  if (nights <= 0) return 0

  return nights * nightlyRate
}
