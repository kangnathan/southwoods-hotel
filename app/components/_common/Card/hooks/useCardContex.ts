import { createContext, useContext } from 'react'

interface CardContextValue {
  maxHeight?: string | number
}

const CardContext = createContext<CardContextValue | undefined>(undefined)

export const CardProvider = CardContext.Provider

export const useCardContext = () => {
  const context = useContext(CardContext)
  if (!context) {
    throw new Error('useCardContext must be used within CardProvider')
  }
  return context
}
