import React from 'react'
import { useNavigate } from 'react-router'

const Logout = (props) => {
  const navigate = useNavigate()
  localStorage.setItem('token', null)
  localStorage.setItem('userName', null)
  localStorage.setItem('userId', null)
  localStorage.setItem('userMail', null)
  localStorage.setItem('localId', null)
  setTimeout(function () {
    return navigate('/login')
  }, 1000);
}

export default Logout