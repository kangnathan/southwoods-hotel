import { z } from "zod"

export const handleMutationError = (error: unknown): never => {
  if (error instanceof z.ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }))
    throw new Error(
      JSON.stringify({
        type: "VALIDATION_ERROR",
        errors: formattedErrors,
      })
    )
  }
  throw error instanceof Error ? error : new Error("Unknown error occurred")
}
