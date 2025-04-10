import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function AdminRoute() {
    const {currentUser} =useSelector((state)=>state.user);
    
  return (
    <div>
      {currentUser?.admin==true?<Outlet/>: <Navigate to='/sign-in' />}
    </div>
  )
}

export default AdminRoute
