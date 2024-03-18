import React, {useState}from 'react'
import {formatPrice} from '../ultils/helper'
import label from '../assets/label.png'
import label_trend from '../assets/label_trending.png'
import {renderStarfromNumber} from '../ultils/helper'
import {SelectOption} from './'
import icons from '../ultils/icon'
import {Link} from 'react-router-dom'
import path from '../ultils/path'
const {FaEye, MdMenu, FaHeart} = icons
const Product = ({productData, isNew, normal}) => {
  const [isShowOption, setIsShowOption] = useState(false)
  return (
    <div className='w-full text-base px-[10px]'>
      <Link 
        to = {`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData.title}`}
        className='w-full border p-[15px] flex flex-col items-center' 
        onMouseEnter = {e => {
          e.stopPropagation();
          setIsShowOption(true)
        }}
        onMouseLeave = {e => {
          e.stopPropagation();
          setIsShowOption(false)
        }}
      >
        <div className='w-full relative'>
          {isShowOption && <div className='absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top'>
            <SelectOption icon={<FaHeart />}/>
            <SelectOption icon={<MdMenu />}/>
            <SelectOption icon={<FaEye />}/>
          </div>}
          <img src={productData?.thumb||'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'} 
          className='w-[243px] h-[243px] object-cover'/>
          {!normal && <img src={isNew? label : label_trend} className={`absolute top-[-12px] left-[-25px] ${isNew ? 'w-[70px]' : 'w-[100px]'} h-[25px] object-cover`}></img>}
          <span className='font-bold absolute top-[-12px] left-[-16px] text-white'>{isNew?'New':'Trending'}</span>
        </div>
        <div className='flex flex-col mt-[15px] items-start gap-1 w-full'>
          <span className='flex h-4'>{renderStarfromNumber(productData?.totalRatings)?.map((el,index)=>(
            <span key={index}>{el}</span>
          ))}</span>
          <span className='line-clamp-1'>{productData?.title}</span>
          <span>{`${formatPrice(productData?.price)} VND`}</span>
        </div>
      </Link>
    </div>
  )
}

export default Product