// app/hooks/useSalesAgentsRouteParams.ts
"use client"

import { useParams } from "next/navigation"

export const useResevationRouteParams = () => {
  const params = useParams()

  return {
    reservationId: Number(params.reservationId) || 0,
  }
}
