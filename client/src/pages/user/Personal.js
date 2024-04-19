import clsx from 'clsx'
import { Button, InputForm } from 'components'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

const Personal = () => {
  const {register, formState:{errors}, handleSubmit, reset} = useForm()
  const {current} = useSelector(state => state.user)
  const handleUpdateInfo = (data)=>{
    console.log(data)
  }
  useEffect(() => {
    reset({
      firstName: current?.firstName,
      lastName: current?.lastName,
      email: current?.email,
      mobile: current?.mobile,
      avatar: current?.avatar,

    })
  }, [current])
  
  console.log(current)
  return (
    <div className='w-full relative px-4'>
      <header className='text-3xl font-semibold py-4 border-b border-b-blue-200'>Personal</header>
      <form onSubmit={handleSubmit(handleUpdateInfo)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
        <InputForm 
          label = 'First Name'
          register={register}
          errors={errors}
          id = 'firstName'
          validate = {{
            required: 'Need fill this field'
          }}
        />
        <InputForm 
          label = 'Last Name'
          register={register}
          errors={errors}
          id = 'lastName'
          validate = {{
            required: 'Need fill this field'
          }}
        />
        <InputForm 
          label = 'Email Address'
          register={register}
          errors={errors}
          id = 'email'
          validate = {{
            required: 'Need fill this field'
          }}
        />
        <InputForm 
          label = 'Phone'
          register={register}
          errors={errors}
          id = 'mobile'
          validate = {{
            required: 'Need fill this field'
          }}
        />
        <div className='flex items-center gap-2'>
          <span className='font-medium'>
            Account Status:
          </span>
          <span className={clsx(current?.isBlocked ? 'text-red-800 font-bold' : 'text-green-800 font-bold')}>
            {current?.isBlocked ? 'Blocked' : 'Active'}
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <span className='font-medium'>
            Role:
          </span>
          <span className='font-medium'>
            {+current?.role === 1411 ? 'Admin' : 'User'}                   
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <span className='font-medium'>
            Created At
          </span>
          <span className='font-medium'>
            {moment(current?.createdAt).fromNow()}                   
          </span>
        </div>

        <div className='w-full flex justify-end'>
        <Button type='submit'>Update Information</Button>
        </div>
      </form>
    </div>
  )
}

export default Personal