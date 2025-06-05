import { Close } from "@mui/icons-material"
import { Alert, AlertTitle, Box, IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import { ToastData } from "./types"

interface ToastProps {
  toast: ToastData
  onClose: () => void
}

export const Toast = ({ toast, onClose }: ToastProps) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setShow(false)
    setTimeout(onClose, 300)
  }

  const getSeverity = () => {
    switch (toast.type) {
      case "success":
        return "success"
      case "error":
        return "error"
      case "warning":
        return "warning"
      case "info":
        return "info"
      default:
        return "info"
    }
  }

  const getColors = () => {
    switch (toast.type) {
      case "success":
        return { bg: "#e6f4ea", text: "#2e7d32" }
      case "error":
        return { bg: "#fdecea", text: "#c62828" }
      case "warning":
        return { bg: "#fff8e1", text: "#f57c00" }
      case "info":
      default:
        return { bg: "#e3f2fd", text: "#1565c0" }
    }
  }

  const { bg, text } = getColors()

  return (
    <Box
      sx={{
        boxShadow: 1,
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: show ? "translateY(0)" : "translateY(10px)",
        opacity: show ? 1 : 0,
        maxWidth: "420px",
        mb: 1,
      }}
    >
      <Alert
        severity={getSeverity()}
        icon={false}
        sx={{
          bgcolor: bg,
          color: text,
          px: 2.5,
          py: 2,
          borderRadius: 3,
          fontSize: "0.95rem",
          "& .MuiAlertTitle-root": {
            fontWeight: 600,
            marginBottom: "2px",
            color: text,
          },
        }}
        action={
          <IconButton
            sx={{ p: 1, mt: -0.5 }}
            size="small"
            aria-label="close"
            onClick={handleClose}
          >
            <Close fontSize="small" sx={{ color: text }} />
          </IconButton>
        }
      >
        {toast.title && <AlertTitle>{toast.title}</AlertTitle>}
        {toast.message}
      </Alert>
    </Box>
  )
}
