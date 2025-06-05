import {
  RoomUpdateForm,
  RoomCreateForm,
} from "@/app/components/Admin/Rooms/CreateUpdateForm/types"

export async function createRoom(data: RoomCreateForm) {
  const res = await fetch("/api/room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.error || "Failed to create room")
  }

  return res.json()
}

export async function updateRoom(id: string, data: Partial<RoomUpdateForm>) {
  const res = await fetch(`/api/room/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData?.error || "Failed to update room")
  }

  return res.json()
}
