// components/RoomDetailsCard.tsx
import React from "react"
import { Card, CardMedia } from "@mui/material"

interface RoomDetailsCardProps {
  image: string
  number: string
  type: string
  name: string
  price: number
}

const RoomDetailsPictureCard: React.FC<RoomDetailsCardProps> = ({
  image,
  name,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{
          // maxWidth: 500, // Reduced width
          maxHeight: 400, // Reduced height
          objectFit: "cover",
        }}
      />
      {/* <CardContent>
        <Stack spacing={1}>
          <Typography variant="h4" fontWeight={700}>
            {name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {type} · Room {number}
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            ${price}/night
          </Typography>
        </Stack>
      </CardContent> */}
    </Card>
  )
}

export default RoomDetailsPictureCard
