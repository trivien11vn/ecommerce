import { Breadcrumb, Button, SelectQuantity } from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { memo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { formatPrice, formatPricee } from 'ultils/helper'

const DetailCart = ({location}) => {
    const {current} = useSelector(state => state.user)
    const [quantity, setQuantity] = useState(0)

    const editQuantity = useCallback((number)=>{
        if(!Number(number)||Number(number)<1) {
          return
        }
        else{
          setQuantity(Number(number))
        }
      },[quantity])

    const handleChange = useCallback((flag)=>{
    if(flag==='minus'){
        if(quantity>=2) setQuantity(prev => prev-1)
    }
    else{
        setQuantity(prev => prev+1)
    }
    },[quantity])

  return (
    <div className='w-full'>
        <div className='h-[81px] flex items-center justify-center bg-gray-100'>
            <div className='w-main'>
                <h3 className='font-semibold uppercase'>My Cart</h3>
                <Breadcrumb category={location?.pathname.substring(1)} />
            </div>
        </div>
        <div className='flex flex-col border w-main mx-auto my-8'>
        <div className='w-main mx-auto py-3 font-bold grid grid-cols-10 bg-gray-400'>
            <span className='col-span-6 w-full text-center'></span>
            <span className='col-span-1 w-full text-center'>Quantity</span>
            <span className='col-span-3 w-full text-center'>Price</span>
        </div>
        {current?.cart?.map(el=>(
            <div key={el._id} className='w-main mx-auto py-3 font-bold grid grid-cols-10 border-b'>
                <span className='col-span-6 w-full'>
                    <div className='flex gap-2 h-full items-center'>
                        <img src={el?.product?.thumb} alt='thumb' className='w-28 h-28 object-cover'></img>
                        <div className='flex flex-col items-start gap-1'>
                            <span className='text-sm font-semibold'>{el?.product?.title}</span>
                            <span className='text-[10px]'>{el?.color}</span>
                        </div>
                    </div>
                </span>
                <span className='col-span-1 w-full text-center'>
                    <div className='flex items-center h-full justify-center'>
                        <SelectQuantity quantity={quantity} editQuantity={editQuantity} handleChange={handleChange} />
                    </div>
                </span>
                <span className='col-span-3 w-full text-center'>
                    <div className='flex items-center h-full justify-center text-lg'>  
                        {formatPrice(el?.product?.price)+' VND'}
                    </div>
                </span>
            </div>
        ))}
        </div>
        <div className='w-main mx-auto flex flex-col justify-center items-end gap-3 mb-12'>
            <span className='flex items-center gap-8 text-sm'>
                <span>
                    Subtotal
                </span>
                <span className='text-main font-semibold text-lg'>
                    {
                        `${formatPrice(current?.cart?.reduce((sum,el)=> +el?.product?.price+sum, 0))} VND`
                    }
                </span>
            </span>
            <span className='text-xs italic '>
             Shipping, taxes, and discounts calculated at checkout.
            </span>
            <Button>
                Checkout
            </Button>
        </div>
    </div>
  )
}

export default withBaseComponent(memo(DetailCart))