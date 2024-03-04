import React, {useEffect, useState, memo} from 'react'
import icons from '../ultils/icon'
import {apiGetProduct} from '../apis/product'
import {renderStarfromNumber, formatPrice} from '../ultils/helper'
const {FaStar} = icons
const DealDaily = () => {
    // const [dealdaily, setDealdaily] = useState(null)
    // const fetchDealDaily = async () => {
    //     const response = await apiGetProduct({limit: 1, page:5})
    //     if(response.success){
    //         setDealdaily(response.products[0])
    //     }
    // }
    // useEffect(()=>{
    //     fetchDealDaily()
    // },[])
    // console.log(dealdaily)
  return (
    <div className='w-full border flex-auto'>
        {/* <div className='flex items-center justify-between p-4 w-full'>
            <span className='flex-2 flex justify-center'><FaStar color='#d11' size={20}/></span>
            <span className='flex-5 font-semibold text-[20px] flex justify-center text-gray-700'>DEAL DAILY</span>
            <span className='flex-3'></span>
        </div>
        <div className='w-full flex flex-col items-center pt-8 gap-2'>
        <img src={dealdaily?.thumb||'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'} 
          className='w-full object-contain'/>
          <span className='flex h-4'>{renderStarfromNumber(dealdaily?.totalRatings)}</span>
          <span className='line-clamp-1'>{dealdaily?.title}</span>
          <span>{`${formatPrice(dealdaily?.price)} VND`}</span>
        </div> */}
    </div>
  )

}

export default memo(DealDaily)