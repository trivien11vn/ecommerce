import { Breadcrumb, Button, OrderItem} from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { memo, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrent } from 'store/user/asyncAction'
import { formatPrice, formatPricee } from 'ultils/helper'
import path from 'ultils/path'


const DetailCart = ({dispatch}) => {
    const {isLogin, currentCart} = useSelector(state => state.user)
    useEffect(() => {
      const setTimeoutId = setTimeout(()=>{
        if(isLogin){
          dispatch(getCurrent())
        }
      },300)
      return () =>{
        clearTimeout(setTimeoutId)
      }
    }, [dispatch, isLogin])


  return (
    <div className='w-full'>
        <div className='h-[81px] flex items-center justify-center bg-gray-100'>
            <div className=''>
                <h3 className='font-semibold uppercase text-2xl'>My Cart</h3>
            </div>
        </div>
        <div className='flex flex-col border mx-auto my-8'>
        <div className='w-full py-3 font-bold grid grid-cols-10 bg-gray-400'>
            <span className='col-span-6 w-full text-center'></span>
            <span className='col-span-1 w-full text-center'>Quantity</span>
            <span className='col-span-3 w-full text-center'>Price</span>
        </div>
        {currentCart?.map(el=>(
           <OrderItem key={el._id} el={el}/>
        ))}
        </div>
        <div className='mx-auto pr-16 flex flex-col justify-center items-end gap-3 mb-12'>
            <span className='flex items-center gap-8 text-sm'>
                <span>
                    Subtotal
                </span>
                <span className='text-main font-semibold text-lg'>
                    {
                        `${formatPrice(currentCart?.reduce((sum,el)=> +el?.price * +el?.quantity +sum, 0))} VND`
                    }
                </span>
            </span>
            <span className='text-xs italic '>
             Shipping, taxes, and discounts calculated at checkout.
            </span>
            <Link target='_blank' className='bg-main text-white px-4 py-2 rounded-md' to={`/${path.CHECKOUT}`}>
                Checkout
            </Link>
        </div>
    </div>
  )
}

export default withBaseComponent(memo(DetailCart))