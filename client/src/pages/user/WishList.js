import { Button, Product } from 'components'
import React from 'react'
import { useSelector } from 'react-redux'

const WishList = () => {
  const {current} = useSelector(state => state.user)
  console.log(current)
  return (
    <div className='w-full relative px-4'>
      <header className='text-3xl font-semibold py-4 border-b border-b-gray-200'>Wish List</header>
      <div className='p-4 w-full grid grid-cols-5 gap-4'>
      {current?.wishlist?.map(el => (
        <div className='bg-white rounded-md drop-shadow-md flex flex-col gap-3' key={el}>
          <Product
            productData={el}
            pid= {el._id}
            normal
            isNotBorder
          />
          <div className='flex justify-center'>
          <Button style='px-2 py-1 rounded-md text-white bg-main font-semibold my-2 w-fit'>
            Add to cart
          </Button>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default WishList