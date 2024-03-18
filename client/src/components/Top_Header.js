import React,{useEffect, memo} from 'react'
import {Link} from 'react-router-dom'
import path from '../ultils/path'
import { getCurrent } from '../store/user/asyncAction'
import { useDispatch, useSelector} from 'react-redux'
import icons from '../ultils/icon'
import { logout } from '../store/user/userSlice'

const {MdLogout} = icons
const Top_Header = () => {
  const dispatch =  useDispatch()
  const {isLogin, current} = useSelector(state => state.user)
  useEffect(() => {
    if(isLogin){
      dispatch(getCurrent())
    }
  }, [dispatch, isLogin])
  
  return (
    <div className='h-[38px] w-full bg-main flex items-center justify-center'>
        <div className='w-main flex items-center justify-between text-xs text-white'>
            <span className=''>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
            {isLogin?
            <div className='flex gap-4 text-sm items-center'>
              <span>
                {`Hello, ${current?.lastName} ${current?.firstName}`}
              </span>
              <span 
                onClick={() => dispatch(logout())}
                className='hover:rounded-full hover:bg-gray-200 hover:text-main cursor-pointer p-2'>
                <MdLogout size={18}/>
              </span>
            </div>: 
            <Link className='hover:text-gray-700' to={`/${path.LOGIN}`}>Sign In or Create Account</Link>}
        </div>
    </div>
  )
}

export default memo(Top_Header)