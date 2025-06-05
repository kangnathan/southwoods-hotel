import { CardHeader, CardContent, SxProps } from "@mui/material"
import { ReactNode } from "react"
import { CardRoot } from "./Root"

export interface CardProps {
  children: ReactNode
  sx?: SxProps
  maxHeight?: React.CSSProperties["maxHeight"]
}

export interface CardHeaderProps {
  title: string
}

export interface CardContentProps {
  children: ReactNode
  sx?: SxProps
}

export interface CardComposition {
  Root: typeof CardRoot
  Header: typeof CardHeader
  Content: typeof CardContent
}
