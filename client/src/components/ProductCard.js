import React from 'react'
import {renderStarfromNumber, formatPrice} from '../ultils/helper'
const ProductCard = ({price, totalRating, image, title}) => {
  return (
    <div className='w-1/3 px-[10px] mb-[20px]'>
      <div className='border flex-auto flex w-full'>
        <img src={image} alt='products' className='w-[120px] object-contain p-4'/>
        <div className='flex flex-col mt-[15px] items-start gap-1 w-full text-xs'>
          <span className='line-clamp-1 capitalize text-sm'>{title?.toLowerCase()}</span>
          <span className='flex h-4'>{renderStarfromNumber(totalRating, 14)?.map((el,index)=>(
            <span key={index}>{el}</span>
          ))}</span>
          <span>{`${formatPrice(price)} VND`}</span>
      </div>
      </div>
    </div>
  )
}

export default ProductCard