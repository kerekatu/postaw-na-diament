import { useEffect, useState } from 'react'

export default function useErrorMessage() {
  const [errorMessageOnResponse, setErrorMessageOnResponse] = useState('')

  useEffect(() => {
    const messageTimer = () =>
      setTimeout(() => {
        setErrorMessageOnResponse('')
      }, 3000)

    return () => clearTimeout(messageTimer)
  }, [errorMessageOnResponse])

  return { errorMessageOnResponse, setErrorMessageOnResponse }
}
