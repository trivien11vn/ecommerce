import React, { useEffect, useState } from 'react'
import { apiUsers } from 'apis/user'
import { roles } from 'ultils/constant'
import moment from 'moment'
const ManageUser = () => {
  const [user, setUser] = useState(null)
  const fetchUsers = async(params) => {
    const response = await apiUsers(params)
    if(response.success){
      setUser(response)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  
  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Manage Users</span>
      </h1>
      <div className='w-full p-4'>
        <table className='table-auto mb-6 text-left w-full'>
          <thead className='font-bold bg-blue-500 text-[13px] text-white'>
           <tr className='border border-gray-500'>
            <th className='px-4 py-2'>#</th>
            <th className='px-4 py-2'>Email address</th>
            <th className='px-4 py-2'>Full Name</th>
            <th className='px-4 py-2'>Role</th>
            <th className='px-4 py-2'>Phone</th>
            <th className='px-4 py-2'>Status</th>
            <th className='px-4 py-2'>Created At</th>
            <th className='px-4 py-2'>Actions</th>
           </tr>
          </thead>
          <tbody>
            {user?.users?.map((el,idx)=>(
              <tr key={el.id} className='border border-gray-500'>
                <td className='py-2 px-4'>{idx+1}</td>
                <td className='py-2 px-4'>{el.email}</td>
                <td className='py-2 px-4'>{`${el.lastName} ${el.firstName}`}</td>
                <td className='py-2 px-4'>{roles.find(role => +role.code === +el.role)?.value}</td>
                <td className='py-2 px-4'>{el.mobile}</td>
                <td className='py-2 px-4'>{el.isBlocked? 'Block': 'Active'}</td>
                <td className='py-2 px-4'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                <td className='py-2 px-4 '>
                  <span className='px-2 text-orange-400 hover:underline cursor-pointer'>Edit</span>
                  <span className='px-2 text-orange-400 hover:underline cursor-pointer'>Delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageUser