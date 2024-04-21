import { Breadcrumb, Button, OrderItem} from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { memo} from 'react'
import { useSelector } from 'react-redux'
import { formatPrice, formatPricee } from 'ultils/helper'


const DetailCart = ({location}) => {
    const {currentCart} = useSelector(state => state.user)

    // const handleChangeQuantity = (pid, quantity, color) => { 
    //     dispatch(updateCart({pid, quantity, color}))
    //     console.log(currentCart)
    //  }

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
        {currentCart?.map(el=>(
           <OrderItem key={el._id} el={el}/>
        ))}
        </div>
        <div className='w-main mx-auto flex flex-col justify-center items-end gap-3 mb-12'>
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
            <Button>
                Checkout
            </Button>
        </div>
    </div>
  )
}

export default withBaseComponent(memo(DetailCart))