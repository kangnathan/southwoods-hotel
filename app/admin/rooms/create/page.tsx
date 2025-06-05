"use client"
import { RoomForm } from "@/app/components/Admin/Rooms/CreateUpdateForm"
import { toast } from "@/app/components/_common/Toast"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { createRoom } from "@/app/api/room/mutations"

export default function RoomCreatePage() {
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createRoom,
    onSuccess: (data) => {
      toast.success("Room created successfully!")
      router.push(`/admin/rooms/${data.id}/update`)
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create room")
    },
  })

  return (
    <RoomForm
      mode="create"
      onSubmit={(data) => mutateAsync(data)}
      isLoading={isPending}
    />
  )
}
