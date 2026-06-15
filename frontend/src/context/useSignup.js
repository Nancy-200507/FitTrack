import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        'https://fittrack-s4zk.onrender.com/api/user/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        }
      )

      // 🔥 SAFE PARSING (IMPORTANT FIX)
      const text = await response.text()

      let data
      try {
        data = JSON.parse(text)
      } catch (err) {
        throw new Error('Server response is not valid JSON')
      }

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed')
      }

      localStorage.setItem('user', JSON.stringify(data))
      login(data)

    } catch (err) {
      console.error('Signup error:', err.message)
      setError(err.message)

    } finally {
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}