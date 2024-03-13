import React from 'react'
import {Link} from 'react-router-dom'
import path from '../ultils/path'
const Top_Header = () => {
  return (
    <div className='h-[38px] w-full bg-main flex items-center justify-center'>
        <div className='w-main flex items-center justify-between text-xs text-white'>
            <span className=''>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
            <Link className='hover:text-gray-700' to={`/${path.LOGIN}`}>Sign In or Create Account</Link>
        </div>
    </div>
  )
}

export default Top_Header