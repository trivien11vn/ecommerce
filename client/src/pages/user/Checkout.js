import React from 'react'
import paypalLogo from 'assets/Mobile Payment.gif';
import { useSelector } from 'react-redux';
import { formatPrice } from 'ultils/helper';
const Checkout = () => {
  const {currentCart} = useSelector(state => state.user)
  console.log(currentCart)
  return (
    <div className='p-8 w-full grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6'>
      <div className='w-full flex items-center justify-center col-span-4'>
        <img className='h-[80%] object-contain' src={paypalLogo}></img>
      </div>
      <div className='w-full flex flex-col items-center gap-6 col-span-6'>
        <h2 className='text-2xl font-bold'>Checkout your order !</h2>
        <table className='table-auto w-full'>
          <thead>
            <tr className='border bg-gray-200'>
              <th className='text-center p-2'>Name</th>
              <th className='text-center p-2'>Quantity</th>
              <th className='text-center p-2'>Price</th>
            </tr>
          </thead>
          <tbody>
            {currentCart?.map(el=>(
              <tr key={el._id} className='border'>
                <td className='text-center p-2'>{el.title}</td>
                <td className='text-center p-2'>{el.quantity}</td>
                <td className='text-center p-2'>{`${formatPrice(el.price)} VND`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          Input address
        </div>
        <div>
          Payment
        </div>
      </div>
    </div>
  )
}

export default Checkout