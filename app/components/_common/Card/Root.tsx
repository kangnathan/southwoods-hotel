import { Box } from "@mui/material"
import { CardProvider } from "./hooks/useCardContex"
import { CardProps } from "./types"

export const shape = {
  borderRadius: {
    default: 12,
    button: 8,
    tab: 24,
  },
}

export const CardRoot = ({ children, maxHeight, sx, ...props }: CardProps) => {
  return (
    <CardProvider value={{ maxHeight }}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: `${shape.borderRadius.default}px`,
          border: `1px solid`,
          p: 3,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          maxHeight: maxHeight,
          ...sx,
        }}
        {...props}
      >
        {children}
      </Box>
    </CardProvider>
  )
}
