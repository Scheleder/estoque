import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
    localStorage.removeItem('userMail')
    localStorage.removeItem('localId')
    localStorage.removeItem('user')
    localStorage.removeItem('userPicture')
    navigate('/login')
  }, [navigate])

  return null
}

export default Logout