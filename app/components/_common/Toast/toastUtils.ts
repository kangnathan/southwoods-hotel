import { ToastData } from './types'

let addToastFn: ((toast: Omit<ToastData, 'id'>) => string) | null = null
let removeToastFn: ((id: string) => void) | null = null
let clearToastsFn: (() => void) | null = null

export const setToastHandler = (handler: (toast: Omit<ToastData, 'id'>) => string) => {
  addToastFn = handler
}

export const setDismissHandler = (handler: (id: string) => void) => {
  removeToastFn = handler
}

export const setClearHandler = (handler: () => void) => {
  clearToastsFn = handler
}

// The main toast function
const createToast = (message: string, options?: Partial<Omit<ToastData, 'id' | 'message'>>) => {
  if (!addToastFn) {
    console.warn('Toast handler not set. Make sure to render the Toaster component.')
    return ''
  }

  return addToastFn({
    type: 'default',
    message,
    ...options
  })
}

// Create the toast API with helper methods
export const toast = Object.assign(
  (message: string, options?: Partial<Omit<ToastData, 'id' | 'message'>>) => createToast(message, options),
  {
    success: (message: string, options?: Partial<Omit<ToastData, 'id' | 'message' | 'type'>>) =>
      createToast(message, { ...options, type: 'success' }),
    error: (message: string, options?: Partial<Omit<ToastData, 'id' | 'message' | 'type'>>) =>
      createToast(message, { ...options, type: 'error' }),
    warning: (message: string, options?: Partial<Omit<ToastData, 'id' | 'message' | 'type'>>) =>
      createToast(message, { ...options, type: 'warning' }),
    info: (message: string, options?: Partial<Omit<ToastData, 'id' | 'message' | 'type'>>) =>
      createToast(message, { ...options, type: 'info' }),
    dismiss: (toastId?: string) => {
      if (!removeToastFn) {
        console.warn('Dismiss handler not set. Make sure to render the Toaster component.')
        return
      }

      if (toastId) {
        removeToastFn(toastId)
      } else if (clearToastsFn) {
        clearToastsFn()
      }
    }
  }
)
