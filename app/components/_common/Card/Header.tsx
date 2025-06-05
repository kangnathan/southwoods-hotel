import { Box, CardHeaderProps, Typography } from "@mui/material"

export const CardHeader = ({ title, ...props }: CardHeaderProps) => {
  return (
    <Box flexShrink={0}>
      <Typography variant={"h6"} {...props}>
        {title}
      </Typography>
    </Box>
  )
}
