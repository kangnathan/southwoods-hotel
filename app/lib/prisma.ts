import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error)
})

if (process.env.NODE_ENV === "production") {
  prisma.$connect().catch((error) => {
    console.error("Error connecting to the database:", error)
  })
}

export default prisma
