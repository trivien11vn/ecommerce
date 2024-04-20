import React, {memo, useState}from 'react'
import {formatPrice} from 'ultils/helper'
import label from 'assets/label.png'
import label_trend from 'assets/label_trending.png'
import {renderStarfromNumber} from 'ultils/helper'
import {SelectOption} from '../index'
import icons from 'ultils/icon'
import {Link} from 'react-router-dom'
import path from 'ultils/path'
import withBaseComponent from 'hocs/withBaseComponent'
const {FaEye, MdMenu, FaHeart} = icons

const Product = ({productData, isNew, normal, navigate}) => {
  const [isShowOption, setIsShowOption] = useState(false)
  const handleClickOptions = (flag) => {
    if(flag === 'Menu'){
      navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData.title}`)
    }
    if(flag === 'Heart'){
      console.log('WishList')
    }
    if(flag === 'Eye'){
      console.log('QuickView')
    }
  } // handleClickOptions

  return (
    <div className='w-full text-base px-[10px]'>
      <div 
        onClick={()=> navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData.title}`)}
        className='w-full border p-[15px] flex flex-col items-center cursor-pointer' 
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
            <span onClick={(e)=>{e.stopPropagation(); handleClickOptions('Heart')}}><SelectOption icon={<FaHeart />}/></span>
            <span onClick={(e)=>{e.stopPropagation(); handleClickOptions('Menu')}}><SelectOption icon={<MdMenu />}/></span>
            <span onClick={(e)=>{e.stopPropagation(); handleClickOptions('Eye')}}><SelectOption icon={<FaEye />}/></span>
          </div>}
          <img src={productData?.thumb||'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'} 
          className='w-[243px] h-[243px] object-cover'/>
          {!normal && <img src={isNew? label : label_trend} className={`absolute top-[-12px] left-[-25px] ${isNew ? 'w-[70px]' : 'w-[100px]'} h-[25px] object-cover`}></img>&&
          <span className='font-bold absolute top-[-12px] left-[-16px] text-white'>{isNew?'New':'Trending'}</span>}
        </div>
        <div className='flex flex-col mt-[15px] items-start gap-1 w-full'>
          <span className='flex h-4'>{renderStarfromNumber(productData?.totalRatings)?.map((el,index)=>(
            <span key={index}>{el}</span>
          ))}</span>
          <span className='line-clamp-1'>{productData?.title}</span>
          <span>{`${formatPrice(productData?.price)} VND`}</span>
        </div>
      </div>
    </div>
  )
}

export default withBaseComponent(memo(Product))