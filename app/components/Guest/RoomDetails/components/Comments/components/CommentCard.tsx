// components/CommentCard.tsx
import { Box, Typography, Avatar, Paper } from "@mui/material"

interface CommentCardProps {
  firstName: string
  lastName: string
  content: string
  createdAt: string
}

export const CommentCard = ({
  firstName,
  lastName,
  content,
  createdAt,
}: CommentCardProps) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: "white",
      }}
    >
      <Box display="flex" gap={2}>
        <Avatar alt={firstName} sx={{ width: 40, height: 40 }} />
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>
            {firstName} {lastName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(createdAt).toLocaleString()}
          </Typography>
          <Typography variant="body2" mt={1} color="text.primary">
            {content}
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}
