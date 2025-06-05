"use client"
import { ReactNode } from "react"
import { CssBaseline, Container } from "@mui/material"
import { GuestNavbar } from "@/app/components/Guest/GuestNavbar"
import GuestSidebar from "../components/Guest/GuestSidebar"
import { Toaster } from "../components/_common/Toast"

export default function GuestLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CssBaseline />
      <GuestSidebar>
        <Container>
          <Toaster />
          <GuestNavbar />
          {children}
        </Container>
      </GuestSidebar>
    </>
  )
}
