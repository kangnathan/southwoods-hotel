"use client"
import React, { createContext, useContext, useState } from "react"

type User = {
  id: number
  role: string
} | null

const AuthContext = createContext<{
  user: User
  setUser: (user: User) => void
}>({
  user: null,
  setUser: () => {},
})

export const AuthProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode
  initialUser: User
}) => {
  const [user, setUser] = useState(initialUser)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
