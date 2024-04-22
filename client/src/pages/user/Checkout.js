import React from 'react'
import paypalLogo from 'assets/Golden Card.gif';
import { useSelector } from 'react-redux';
import { formatPrice } from 'ultils/helper';
import { InputForm, Paypal } from 'components';
import { useForm } from 'react-hook-form';


const Checkout = () => {
  const {currentCart} = useSelector(state => state.user)
  const {register, formState:{errors}, reset, handleSubmit, watch} = useForm()

  console.log(+currentCart?.reduce((sum,el)=> +el?.price * +el?.quantity +sum, 0)/23500)
  return (
    <div className='p-8 w-full grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6'>
      <div className='w-full flex items-center justify-center col-span-4'>
        <img className='h-[70%] object-contain' src={paypalLogo}></img>
      </div>
      <div className='w-full flex flex-col items-center justify-center gap-6 col-span-6'>
        <h2 className='text-3xl mb-6 font-bold'>Checkout your order !</h2>
        <div className='w-full flex gap-6 justify-between'>
          <table className='table-auto flex-1'>
            <thead>
              <tr className='border bg-gray-200 rounded-md'>
                <th className='text-center p-2'>Name</th>
                <th className='text-center p-2'>Quantity</th>
                <th className='text-center p-2'>Price</th>
              </tr>
            </thead>
            <tbody>
              {currentCart?.map(el=>(
                <tr key={el._id} className='border'>
                  <td className='text-center p-2'>{`${el.title} - ${el.color}`}</td>
                  <td className='text-center p-2'>{el.quantity}</td>
                  <td className='text-center p-2'>{`${formatPrice(el.price*el?.quantity)} VND`}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex-1 flex flex-col justify-between'>
            <div className='flex flex-col gap-6'>
              <span className='flex items-center gap-8 text-sm font-semibold'>
                <span>
                    Subtotal
                </span>
                <span className='text-main font-semibold text-lg'>
                    {
                        `${formatPrice(currentCart?.reduce((sum,el)=> +el?.price * +el?.quantity +sum, 0))} VND`
                    }
                </span>
              </span>
              <InputForm 
                label = 'Your Address'
                register={register}
                errors={errors}
                id = 'address'
                validate = {{
                  required: 'Need fill this field'
                }}
                fullWidth
                placeholder='Please input your address for shipping'
                style= 'font-semibold'
              />
            </div>
            <div className=''>
              <Paypal amount={Math.round(+currentCart?.reduce((sum,el)=> +el?.price * +el?.quantity +sum, 0)/23500)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout