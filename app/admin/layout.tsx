"use client"
import { ReactNode } from "react"
import { Container, CssBaseline } from "@mui/material"
import Sidebar from "../components/Admin/AdminSidebar"
import { Toaster } from "../components/_common/Toast"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CssBaseline />
      <Sidebar>
        <Toaster />
        <Container>{children}</Container>
      </Sidebar>
    </>
  )
}
