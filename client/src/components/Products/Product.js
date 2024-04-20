import React, {memo, useState}from 'react'
import {formatPrice} from 'ultils/helper'
import label from 'assets/label.png'
import label_trend from 'assets/label_trending.png'
import {renderStarfromNumber} from 'ultils/helper'
import {SelectOption} from 'components'
import icons from 'ultils/icon'
import withBaseComponent from 'hocs/withBaseComponent'
import { showModal } from 'store/app/appSlice'
import { DetailProduct } from 'pages/public'
import { apiUpdateCart } from 'apis'
import { toast } from 'react-toastify'
import { getCurrent } from 'store/user/asyncAction'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import path from 'ultils/path'
const {FaEye, FaHeart, FaCartPlus, BsCartCheckFill} = icons

const Product = ({productData, isNew, normal, navigate, dispatch}) => {
  const [isShowOption, setIsShowOption] = useState(false)
  const {current} = useSelector(state => state.user)

  const handleClickOptions = async (flag) => {
    if(flag === 'Cart'){
      if(!current){
        return Swal.fire({
          title: "You haven't logged in",
          text: 'Please login and try again',
          icon: 'warning',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Go to Login',
          cancelButtonText: 'Not now',                
        }).then((rs)=>{
          if(rs.isConfirmed){
            navigate(`/${path.LOGIN}`)
          }
        })
      }
      console.log(productData)
      console.log({pid: productData._id, color: productData.color })
      const response = await apiUpdateCart({pid: productData._id, color: productData.color })
      if(response.success){
        toast.success(response.mes)
        dispatch(getCurrent())
      }
      else{
        toast.error(response.mes)
      }
    }
    if(flag === 'Heart'){
      console.log('WishList')
    }
    if(flag === 'Eye'){
      dispatch(showModal({isShowModal: true, modalChildren: <DetailProduct data={{pid: productData?._id, category: productData?.category}} isQuickView={true} />}))
    }
  } // handleClickOptions

  return (
    <div className='w-full text-base px-[10px]'>
      <div 
        onClick={()=> navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData.title}`)}
        className='w-full border p-[15px] flex flex-col items-center cursor-pointer' 
        onMouseEnter = {e => {
          // e.stopPropagation();
          setIsShowOption(true)
        }}
        onMouseLeave = {e => {
          e.stopPropagation();
          setIsShowOption(false)
        }}
      >
        <div className='w-full relative'>
          {isShowOption && <div className='absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top'>
            <span title='Add to WishList' onClick={(e)=>{e.stopPropagation(); handleClickOptions('Heart')}}><SelectOption icon={<FaHeart />}/></span>
            {
              current?.cart?.some(el => el.product === productData._id) ? 
              <span title='Added'><SelectOption icon={<BsCartCheckFill color='green' />}/></span>
              :
              <span title='Add to Cart' onClick={(e)=>{e.stopPropagation(); handleClickOptions('Cart')}}><SelectOption icon={<FaCartPlus />}/></span>
            }
            <span title='Quick View' onClick={(e)=>{e.stopPropagation(); handleClickOptions('Eye')}}><SelectOption icon={<FaEye />}/></span>
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