import { Box } from '@mui/material'
import { useCardContext } from './hooks/useCardContex'
import { CardContentProps } from './types'

export const CardContent = ({ children, sx, ...props }: CardContentProps) => {
  const { maxHeight } = useCardContext()
  return (
    <Box
      sx={{
        pt: 2,
        overflow: 'auto',
        minHeight: 0,
        maxHeight,
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
