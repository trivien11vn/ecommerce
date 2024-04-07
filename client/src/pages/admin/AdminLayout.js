import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import path from 'ultils/path'
import { useSelector } from 'react-redux'

const AdminLayout = () => {
  const {isLogin,current} = useSelector(state => state.user)
  if(!isLogin || !current || current.role !== 1411){
    return <Navigate to={`/${path.LOGIN}`} replace={true}/>
  }
  return (
    <div>
      <div>Admin Layout</div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout