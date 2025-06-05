import React from "react"
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
  Stack,
} from "@mui/material"

export const RoomCardSkeleton: React.FC = () => {
  return (
    <Grid container spacing={2} sx={{ p: 1.5 }}>
      {Array.from({ length: 16 }).map((_, index) => (
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
          }}
          key={index}
        >
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: 1,
              maxWidth: 250,
            }}
          >
            <CardMedia>
              <Skeleton
                variant="rectangular"
                height={160}
                sx={{ borderRadius: "16px 16px 0 0" }}
              />
            </CardMedia>
            <CardContent>
              <Stack spacing={0.5}>
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="80%" height={24} />
                <Skeleton variant="text" width="40%" height={20} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
