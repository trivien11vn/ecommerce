import React from 'react'
import {InputForm, Select} from 'components'
import { useForm } from 'react-hook-form'
import {useSelector} from 'react-redux'

const CreateProduct = () => {
  const {categories} = useSelector(state => state.app)
  const {register, formState:{errors}, reset, handleSubmit, watch} = useForm()
  const handleCreateProduct = (data) => {

  }

  console.log(watch('category'))
  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Create New Product</span>
      </h1>
      <div className='p-4 '>
        <form onSubmit={() => handleSubmit(handleCreateProduct)}>
          <InputForm 
            label = 'Name product'
            register={register}
            errors={errors}
            id = 'title'
            validate = {{
              required: 'Need fill this field'
            }}
            fullWidth
            placeholder='Name of new product'
          />
          <div className='w-full my-6 flex gap-4'>
            <InputForm 
              label = 'Price'
              register={register}
              errors={errors}
              id = 'price'
              validate = {{
                required: 'Need fill this field'
              }}
              style='flex-auto'
              placeholder='Price of new product'
              type='number'
            />
            <InputForm 
              label = 'Quantity'
              register={register}
              errors={errors}
              id = 'quantity'
              validate = {{
                required: 'Need fill this field'
              }}
              style='flex-auto'
              placeholder='Quantity of new product'
              type='number'
            />
            <InputForm 
              label = 'Color'
              register={register}
              errors={errors}
              id = 'color'
              validate = {{
                required: 'Need fill this field'
              }}
              style='flex-auto'
              placeholder='Color of new product'
            />
          </div>
          <div className='w-full my-6 flex gap-4'>
            <Select 
              label = 'Category'
              options = {categories?.map(el =>(
                {code: el._id,
                value: el.title}
              ))}
              register={register}
              id = 'category'
              validate = {{
                required: 'Need fill this field'
              }}
              style='flex-auto'
              errors={errors}
              fullWidth
            />

            <Select 
              label = 'Brand'
              options = {categories?.map(el =>(
                {code: el._id,
                value: el.title}
              ))}
              register={register}
              id = 'brand'
              validate = {{
                required: 'Need fill this field'
              }}
              style='flex-auto'
              errors={errors}
              fullWidth
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct