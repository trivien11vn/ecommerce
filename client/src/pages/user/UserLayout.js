import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import path from 'ultils/path'
import { useSelector } from 'react-redux'

const UserLayout = () => {
  const {isLogin,current} = useSelector(state => state.user)
  console.log(isLogin, current)
  if(!isLogin || !current){
    return <Navigate to={`/${path.LOGIN}`} replace={true}/>
  }

  return (
    <div>
      UserLayout
      <Outlet />
    </div>
  )
}

export default UserLayout