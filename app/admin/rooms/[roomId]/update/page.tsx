"use client"
import { RoomForm } from "@/app/components/Admin/Rooms/CreateUpdateForm"
import { toast } from "@/app/components/_common/Toast"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "@tanstack/react-query"
import { updateRoom } from "@/app/api/room/mutations"
import { useRoomRouteParams } from "@/app/components/Admin/Rooms/hooks/useRoomRouteParams"
import { roomFindMany } from "@/app/api/room/queries"
import { RoomUpdateForm } from "@/app/components/Admin/Rooms/CreateUpdateForm/types"

export default function RoomCreatePage() {
  const router = useRouter()
  const { roomId } = useRoomRouteParams()

  console.log("THIS IS THE ROOM ID: ", roomId)

  const { data: roomsData } = useQuery({
    queryKey: ["rooms"],
    queryFn: roomFindMany,
  })

  const getProductById = (roomId: number) =>
    roomsData?.find((room: RoomUpdateForm) => room.id === roomId)

  const room = getProductById(Number(roomId))

  console.log("THIS IS THE ROOM: ", room)

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: RoomUpdateForm) =>
      updateRoom(String(roomId), data),
    onSuccess: (room) => {
      toast.success("Room updated successfully!")
      router.push(`/admin/rooms/${room.id}/update`)
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update room")
    },
  })

  return (
    <RoomForm
      mode="update"
      onSubmit={(data) => mutateAsync({ ...data, id: Number(roomId) })}
      isLoading={isPending}
      defaultValues={room}
    />
  )
}
