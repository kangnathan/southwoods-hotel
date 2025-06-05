import {
  Box,
  IconButton as MuiIconButton,
  Typography,
  Stack,
  SxProps,
} from "@mui/material"

interface IconButtonProps {
  icon: React.ReactNode
  label?: string | React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  alignment?: "vertical" | "horizontal"
  active?: boolean
  sx?: SxProps
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  onClick,
  disabled = false,
  alignment = "vertical",
  active = false,
  sx,
  type = "button",
}) => {
  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          color: active ? "teal.main" : "grey.400",
          "& svg": {
            fontSize: 24,
          },
        }}
      >
        {icon}
      </Box>
      {!!label &&
        (typeof label === "string" ? (
          <Typography
            variant={"h3"}
            sx={{
              mt: alignment === "vertical" ? 1 : 0,
              ml: alignment === "horizontal" ? 1 : 0,
              color: active ? "teal.main" : "grey.600",
            }}
          >
            {label}
          </Typography>
        ) : (
          <Box
            sx={{
              mt: alignment === "vertical" ? 1 : 0,
              ml: alignment === "horizontal" ? 1 : 0,
              color: active ? "teal.main" : "grey.600",
              textAlign: "center",
            }}
          >
            {label}
          </Box>
        ))}
    </>
  )

  return (
    <MuiIconButton onClick={onClick} disabled={disabled} sx={sx} type={type}>
      {alignment === "vertical" ? (
        <Stack alignItems={"center"}>{content}</Stack>
      ) : (
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          {content}
        </Stack>
      )}
    </MuiIconButton>
  )
}
