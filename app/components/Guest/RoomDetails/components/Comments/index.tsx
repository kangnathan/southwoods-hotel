// CommentsBox.tsx
import React, { useState, useEffect } from "react"
import { Box, Typography, TextField, Button, Divider } from "@mui/material"
import { CommentCard } from "./components/CommentCard"
import { toast } from "../../../../_common/Toast"

interface Comment {
  id: number
  content: string
  createdAt: string
  firstName: string
  lastName: string
  image?: string | null
}

interface CommentsBoxProps {
  roomId: number
  userId: number
}

export const CommentsBox = ({ roomId, userId }: CommentsBoxProps) => {
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment?roomId=${roomId}`)
        if (!res.ok) throw new Error("Failed to fetch comments")
        const data = await res.json()
        setComments(data)
      } catch (error) {
        console.error("Error fetching comments:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [roomId])

  const handleAddComment = async () => {
    if (!commentText.trim()) return

    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: commentText,
          userId,
          roomId,
        }),
      })
      toast.success("Comment successful")

      if (!res.ok) throw new Error("Failed to post comment")

      const newComment = await res.json()
      setComments((prev) => [newComment, ...prev])
      setCommentText("")
    } catch (error) {
      console.error("Error posting comment:", error)
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      gap={3}
      border="1px solid #e0e0e0"
      borderRadius={4}
      p={3}
      bgcolor="#fafafa"
    >
      <Typography variant="h6" fontWeight={600} color="text.primary">
        Comments
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          fullWidth
          size="small"
          label="Write your comment..."
          variant="outlined"
          multiline
          minRows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          sx={{ borderRadius: 2 }}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={handleAddComment}
            sx={{
              borderRadius: 8,
              textTransform: "none",
              px: 3,
              bgcolor: "#1976d2",
              ":hover": {
                bgcolor: "#115293",
              },
            }}
          >
            Post Comment
          </Button>
        </Box>
      </Box>

      <Divider />

      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        maxHeight={300}
        overflow="auto"
        pr={1} // Adds right padding to prevent cut-off shadows
      >
        {loading ? (
          <Typography variant="body2" color="text.secondary">
            Loading comments...
          </Typography>
        ) : comments.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No comments yet.
          </Typography>
        ) : (
          comments.map((c) => (
            <CommentCard
              key={c.id}
              firstName={c.firstName}
              lastName={c.lastName}
              content={c.content}
              createdAt={c.createdAt}
            />
          ))
        )}
      </Box>
    </Box>
  )
}
