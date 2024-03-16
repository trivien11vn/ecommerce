import React, {useEffect, useState, memo} from 'react'
import icons from '../ultils/icon'
import {apiGetProduct} from '../apis/product'
import {renderStarfromNumber, formatPrice} from '../ultils/helper'
import {Countdown} from './'
import { min } from 'moment/moment'
const {FaStar, MdMenu} = icons
let idInterval 
const DealDaily = () => {
    const [dealdaily, setDealdaily] = useState(null)
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(0)
    const [expire, setExpire] = useState(false)
    const fetchDealDaily = async () => {
        const response = await apiGetProduct({limit: 1, page:Math.round(Math.random()*10), totalRatings:5})
        if(response.success){
            setDealdaily(response.products[0])
            const h = 23 - new Date().getHours()
            const m = 60 - new Date().getMinutes()
            const s = 60 - new Date().getSeconds()
            setHour(h)
            setMinute(m)
            setSecond(s)
        }
        else{
            const h = 23 - new Date().getHours()
            const m = 60 - new Date().getMinutes()
            const s = 60 - new Date().getSeconds()
            setHour(h)
            setMinute(m)
            setSecond(s)
        }
    }
    // useEffect(()=>{
    //     fetchDealDaily()
    // },[])
    useEffect(() => {
        idInterval && clearInterval(idInterval)
        fetchDealDaily()
    }, [expire])
    
    useEffect(()=>{
        idInterval = setInterval(() => {
            if(second > 0){setSecond(prev => prev -1)}
            else{
                if(minute > 0){
                    setMinute(prev => prev - 1)
                    setSecond(59)
                }
                else{
                    if(hour > 0){
                        setHour(prev => prev - 1)
                        setMinute(59)
                        setSecond(59)
                    }
                    else{
                        setExpire(!expire)
                    }
                }

            }
        },1000)
        return () => {
            clearInterval(idInterval)
        }
    },[second, minute, hour, expire])
  return (
    <div className='w-full border flex-auto'>
        <div className='flex items-center justify-between p-4 w-full'>
            <span className='flex-2 flex justify-center'><FaStar color='#d11' size={20}/></span>
            <span className='flex-5 font-semibold text-[20px] flex justify-center text-gray-700'>DEAL DAILY</span>
            <span className='flex-3'></span>
        </div>
        <div className='w-full flex flex-col items-center pt-8 px-4 gap-2'>
        <img src={dealdaily?.thumb||'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'} 
          className='w-full object-contain' alt=''/>
          <span className='line-clamp-1 text-center'>{dealdaily?.title}</span>
          <span className='flex h-4'>{renderStarfromNumber(dealdaily?.totalRatings, 20)?.map((el, index)=>(
            <span key={index}> {el} </span>
          ))}</span>
          <span>{`${formatPrice(dealdaily?.price)} VND`}</span>
        </div>
        <div className='px-4 mt-8'>
            <div className='flex justify-center gap-2 mb-4'>
                <Countdown unit={'Hours'} number = {hour}/>
                <Countdown unit={'Minutes'} number = {minute}/>
                <Countdown unit={'Seconds'} number = {second}/>
            </div>
            <button type='button' className='flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-semibold py-2'>
                <MdMenu />
                <span>
                    Option
                </span>
            </button>
        </div>
    </div>
  )

}

export default memo(DealDaily)