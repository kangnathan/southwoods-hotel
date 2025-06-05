"use client"

import React, { useState } from "react"
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  IconButton,
} from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { toast } from "@/app/components/_common/Toast"

interface RoomCardProps {
  image: string
  number: string
  type: string
  name: string
  price: number
  roomId: number
  userId: number
  isFavorite?: boolean
  onClick?: () => void
}

const RoomCard: React.FC<RoomCardProps> = ({
  image,
  number,
  type,
  name,
  price,
  roomId,
  userId,
  isFavorite = false,
  onClick,
}) => {
  const [favorited, setFavorited] = useState(isFavorite)
  const [loading, setLoading] = useState(false)

  const toggleFavorite = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/favorites", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, userId }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.message === "Favorited") {
          toast.success("Room added to favorites!")
          setFavorited(true)
        } else if (data.message === "Unfavorited") {
          toast.success("Room removed from favorites!")
          setFavorited(false)
        }
      }
    } catch (err) {
      console.error("Toggle failed", err)
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 4,
        boxShadow: 1,
        backgroundColor: "background.paper",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "scale(1.015)",
          boxShadow: 3,
          cursor: "pointer",
        },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={name}
        sx={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          objectFit: "cover",
        }}
      />

      <CardContent
        sx={{
          px: 2,
          py: 1.5,
        }}
      >
        <Stack spacing={0.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="body1"
              fontWeight={600}
              sx={{ fontSize: "1rem", color: "text.primary" }}
            >
              {name}
            </Typography>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                if (!loading) toggleFavorite()
              }}
              sx={{
                color: favorited ? "error.main" : "text.secondary",
                transition: "color 0.2s ease",
              }}
            >
              {favorited ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
          </Stack>

          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontSize: "0.85rem" }}
          >
            {type} · Room {number}
          </Typography>

          <Typography
            variant="subtitle2"
            fontWeight={600}
            sx={{ fontSize: "0.9rem", color: "text.primary" }}
          >
            ${price}/night
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default RoomCard
