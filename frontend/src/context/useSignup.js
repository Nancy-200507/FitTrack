import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setIsLoading(false)
      return
    }

    // save user in local storage
    localStorage.setItem('user', JSON.stringify(json))

    // update auth context
    login(json)

    setIsLoading(false)
  }

  return { signup, isLoading, error }
}