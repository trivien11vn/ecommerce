import withBaseComponent from 'hocs/withBaseComponent'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { showCart } from 'store/app/appSlice'
import icons from 'ultils/icon'

const {IoCloseSharp} = icons
const Cart = ({dispatch}) => {
    const {current} = useSelector(state => state.user)
    console.log(current)
  return (
    <div onClick={e=> e.stopPropagation()} className='w-[400px] h-screen bg-black grid grid-rows-10 text-white p-4'>
        <header className='border-b border-gray-800 flex justify-between items-center font-bold text-2xl row-span-1 h-full'>
            <span>Your Cart</span>
            <span onClick={()=>{dispatch(showCart())}} className='p-2 cursor-pointer'><IoCloseSharp size={24}/></span>
        </header>
        <section className='row-span-6 flex flex-col gap-3 h-full max-h-full overflow-y-auto py-3'>
            {!current?.cart && <span className='text-xs italic'>Your cart is empty</span>}
            {current?.cart &&
            current?.cart?.map(el=>(
                <div key={el?._id} className='flex items-center gap-2'>
                    <img src={el?.product?.thumb} alt='thumb' className='w-16 h-16 object-cover'></img>
                    <div className='flex flex-col gap-1'>
                        <span className='font-semibold'>{el?.product?.title}</span>
                        <span className='text-xs'>{el?.color}</span>
                        <span className='text-lg'>{el?.product?.price}</span>
                    </div>
                </div>
            ))}
        </section>
        <div className='row-span-3 h-full'>
            Checkout
        </div>
    </div>
  )
}

export default withBaseComponent(memo(Cart))