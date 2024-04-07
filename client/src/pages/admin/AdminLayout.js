import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import path from 'ultils/path'
import { useSelector } from 'react-redux'
import {AdminSideBar} from 'components'

const AdminLayout = () => {
  const {isLogin,current} = useSelector(state => state.user)
  if(!isLogin || !current || +current.role !== 1411){
    return <Navigate to={`/${path.LOGIN}`} replace={true}/>
  }
  return (
    <div className='flex w-full bg-zinc-900 min-h-screen relative text-white'>
      <div className='w-[327px] flex-none fixed top-0 bottom-0'>
        <AdminSideBar />
      </div>
      <div className='w-[327px]'>

      </div>
      <div className='flex-auto '>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout