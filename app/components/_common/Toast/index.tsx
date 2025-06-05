import { useEffect } from 'react'
import { ToastProvider, useToasts } from './context'
import { Toaster as ToasterComponent } from './Toaster'
import { setToastHandler, setDismissHandler, setClearHandler, toast } from './toastUtils'
import { ToasterProps } from './types'

export const Toaster = (props: ToasterProps) => {
  return (
    <ToastProvider>
      <ToasterWithHandler {...props} />
    </ToastProvider>
  )
}

const ToasterWithHandler = (props: ToasterProps) => {
  const { addToast, removeToast, clearToasts } = useToasts()

  useEffect(() => {
    setToastHandler(addToast)
    setDismissHandler(removeToast)
    setClearHandler(clearToasts)
  }, [addToast, removeToast, clearToasts])

  return <ToasterComponent {...props} />
}

export { toast }
