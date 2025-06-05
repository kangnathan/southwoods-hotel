"use client"
import { ReactNode } from "react"
import { Container, CssBaseline } from "@mui/material"
import Sidebar from "../components/Admin/AdminSidebar"
import { Toaster } from "../components/_common/Toast"
import { GuestNavbar } from "../components/Guest/GuestNavbar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CssBaseline />
      <Sidebar>
        <Toaster />

        <Container>
          <Container>
            <Container>
              <Container>
                <GuestNavbar />
              </Container>
            </Container>
          </Container>

          {children}
        </Container>
      </Sidebar>
    </>
  )
}
