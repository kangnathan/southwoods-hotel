// components/RoomDetailsCardSkeleton.tsx
import React from "react"
import { Card, CardContent, Skeleton, Stack } from "@mui/material"

export const RoomDetailsCardSkeleton: React.FC = () => {
  return (
    <Card
      sx={{
        borderRadius: 6,
        boxShadow: 2,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
      }}
    >
      <Skeleton
        variant="rectangular"
        width={500}
        height={322}
        sx={{ flexShrink: 0 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>
          <Skeleton variant="text" height={40} width="60%" />
          <Skeleton variant="text" height={30} width="40%" />
          <Skeleton variant="text" height={30} width="30%" />
        </Stack>
      </CardContent>
    </Card>
  )
}
