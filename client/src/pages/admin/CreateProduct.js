import React, { useCallback, useState} from 'react'
import {InputForm, Select, Button, MarkdownEditor} from 'components'
import { useForm } from 'react-hook-form'
import {useSelector} from 'react-redux'
import { validate } from 'ultils/helper'

const CreateProduct = () => {
  const {categories} = useSelector(state => state.app)
  const {register, formState:{errors}, reset, handleSubmit, watch} = useForm()

  const [payload, setPayload] = useState({
    description: ''
  })
  const [invalidField, setInvalidField] = useState([])

  const changeValue = useCallback((e)=>{
    setPayload(e)
  },[payload])

  const handleCreateProduct = (data) => {
    const invalid = validate(payload, setInvalidField)
    if(invalid === 0){
      if(data?.category){
        data.category = categories?.find(el => el._id === data.category)?.title
      }
      const finalPayload = {...data,...payload}
      const formData = new FormData()
      for(let i of Object.entries(finalPayload)){
        formData.append(i[0],i[1])
      }
    }
  }

  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Create New Product</span>
      </h1>
      <div className='p-4 '>
        <form onSubmit={handleSubmit(handleCreateProduct)}>
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
              label = 'Brand (Optional)'
              options = {categories?.find(el => el._id === watch('category'))?.brand?.map(item => ({code:item, value:item}))}
              register={register}
              id = 'brand'
              style='flex-auto'
              errors={errors}
              fullWidth
            />
          </div>
          <MarkdownEditor 
            name = 'description'
            changeValue={changeValue}
            label = 'description'
            invalidField={invalidField}
            setInvalidField={setInvalidField}
          />
          <div className='flex flex-col gap-2 mt-8'>
            <label className='font-semibold' htmlFor='thumb'>Upload Thumb</label>
            <input 
              {...register('thumb', {required: 'Need upload thumb'})}
              type='file' 
              id='thumb'
            />
            {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
          </div>

          <div className='flex flex-col gap-2 mt-8'>
            <label className='font-semibold' htmlFor='product'>Upload image of product</label>
            <input 
              {...register('product', {required: 'Need upload image of product'})}
              type='file' 
              id='product' 
              multiple
            />
            {errors['product'] && <small className='text-xs text-red-500'>{errors['product']?.message}</small>}
          </div>
          <div className='mt-8'>
            <Button type='submit'>
              Create a new product
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct