// app/hooks/useSalesAgentsRouteParams.ts
"use client"

import { useParams } from "next/navigation"

export const useRoomRouteParams = () => {
  const params = useParams()

  return {
    roomId: Number(params.roomId) || 0,
  }
}
