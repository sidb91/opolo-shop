import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = (): React.JSX.Element => {

  const { userInfo } = useSelector((state:any)=> state.auth)

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute