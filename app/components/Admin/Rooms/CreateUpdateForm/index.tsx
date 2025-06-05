"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { RoomStatus, RoomType } from "@prisma/client"
import {
  TextField,
  MenuItem,
  Button,
  Paper,
  Box,
  Typography,
} from "@mui/material"
import { useEffect } from "react"
import { regularRoomImagesOptions } from "./components/Rooms"

const roomSchema = z.object({
  number: z.string().min(1, "Room number is required"),
  name: z.string().min(1, "Room name is required"),
  image: z.string().optional(),
  price: z.coerce.number().positive("Price must be a positive number"),
  type: z.nativeEnum(RoomType),
  status: z.nativeEnum(RoomStatus),
  description: z.string().optional(),
  capacity: z.number(),
})

type RoomFormValues = z.infer<typeof roomSchema>

type RoomFormProps = {
  defaultValues?: Partial<RoomFormValues>
  onSubmit: (data: RoomFormValues) => Promise<void>
  isLoading?: boolean
  mode: "create" | "update"
}

export function RoomForm({
  defaultValues,
  onSubmit,
  isLoading,
  mode,
}: RoomFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      number: "",
      name: "",
      image: "",
      price: 0,
      type: RoomType.REGULAR,
      status: RoomStatus.AVAILABLE,
    },
  })

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [defaultValues, reset])

  const type = watch("type")
  const status = watch("status")
  const image = watch("image")

  return (
    <Paper
      elevation={1}
      sx={{
        p: 4,
        borderRadius: 4,
        backgroundColor: "#fafafa",
        maxWidth: 600,
        mx: "auto",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Typography variant="h5" fontWeight={600} mb={3} color="#333">
        {mode === "create" ? "Create New Room" : "Update Room"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField
          label="Room Number"
          fullWidth
          error={!!errors.number}
          helperText={errors.number?.message}
          {...register("number")}
          InputProps={{ sx: { borderRadius: 2 } }}
        />

        <TextField
          label="Room Name"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register("name")}
          InputProps={{ sx: { borderRadius: 2 } }}
        />

        <TextField
          label="Description"
          fullWidth
          error={!!errors.description}
          helperText={errors.description?.message}
          {...register("description")}
          multiline
          rows={3}
          InputProps={{ sx: { borderRadius: 2 } }}
        />

        <TextField
          label="Capacity"
          type="number"
          fullWidth
          error={!!errors.capacity}
          helperText={errors.capacity?.message}
          {...register("capacity", { valueAsNumber: true })}
          InputProps={{ sx: { borderRadius: 2 } }}
        />

        <TextField
          select
          label="Image"
          fullWidth
          value={image ?? ""}
          onChange={(e) => setValue("image", e.target.value)}
          error={!!errors.image}
          helperText={errors.image?.message}
          InputProps={{ sx: { borderRadius: 2 } }}
        >
          {regularRoomImagesOptions.map((option) => (
            <MenuItem key={option.name} value={option.src}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Room Type"
          fullWidth
          value={type}
          onChange={(e) => setValue("type", e.target.value as RoomType)}
          error={!!errors.type}
          helperText={errors.type?.message}
          InputProps={{ sx: { borderRadius: 2 } }}
        >
          {Object.values(RoomType).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Room Status"
          fullWidth
          value={status}
          onChange={(e) => setValue("status", e.target.value as RoomStatus)}
          error={!!errors.status}
          helperText={errors.status?.message}
          InputProps={{ sx: { borderRadius: 2 } }}
        >
          {Object.values(RoomStatus).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Price"
          type="number"
          fullWidth
          error={!!errors.price}
          helperText={errors.price?.message}
          {...register("price")}
          InputProps={{ sx: { borderRadius: 2 } }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          fullWidth
          sx={{
            mt: 1,
            textTransform: "none",
            borderRadius: 2,
            py: 1.25,
            fontWeight: 500,
            backgroundColor: "#3f51b5",
            "&:hover": {
              backgroundColor: "#2c3e90",
            },
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {mode === "create" ? "Create Room" : "Update Room"}
        </Button>
      </Box>
    </Paper>
  )
}
