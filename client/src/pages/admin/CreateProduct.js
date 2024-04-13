import React, { useCallback, useState, useEffect} from 'react'
import {InputForm, Select, Button, MarkdownEditor} from 'components'
import { useForm } from 'react-hook-form'
import {useSelector} from 'react-redux'
import { validate, getBase64 } from 'ultils/helper'
import { toast } from 'react-toastify'
import icons from 'ultils/icon'

const {RiDeleteBin6Line} = icons
const CreateProduct = () => {
  const {categories} = useSelector(state => state.app)
  const {register, formState:{errors}, reset, handleSubmit, watch} = useForm()

  const [payload, setPayload] = useState({
    description: ''
  })
  const [invalidField, setInvalidField] = useState([])
  
  const [hoverElement, setHoverElement] = useState(null)

  const [preview, setPreview] = useState({
    thumb: null,
    images: []
  })
  const changeValue = useCallback((e)=>{
    setPayload(e)
  },[payload])

  const handlePreviewThumb = async(file) => {
    const base64Thumb = await getBase64(file)
    setPreview(prev => ({...prev, thumb: base64Thumb}))
  }

  const handlePreviewImages = async(files) => {
    const imagesPreview = []
    for(let i of files){
      if(i.type !== 'image/png' && i.type !== 'image/jpeg'){
        toast.warning('The file sent is not a JPG or PNG')
        return
      }
      const base64 = await getBase64(i)
      imagesPreview.push({
        name: i.name,
        path: base64
      })
    }
    if(imagesPreview.length > 0){
      setPreview(prev => ({...prev, images: imagesPreview}))
    }
  }
  useEffect(() => {
    handlePreviewThumb(watch('thumb')[0])
  }, [watch('thumb')])

  useEffect(() => {
    handlePreviewImages(watch('images'))
  }, [watch('images')])


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

  const handleRemoveImage = (name) => {
    const files = [...watch('images')]
    reset({
      images: files?.filter(el => el.name !== name)
    })
    if(preview.images?.some(el => el.name === name)){
      setPreview(prev => ({...prev, images: prev.images?.filter(el => el.name !== name)}))
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
            label = 'Description'
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
          
          {preview.thumb 
            && 
          <div className='my-4'>
            <img src={preview.thumb} alt='thumbnail' className='w-[200px] object-contain'></img>
          </div>
          }

          <div className='flex flex-col gap-2 mt-8'>
            <label className='font-semibold' htmlFor='product'>Upload image of product</label>
            <input 
              {...register('images', {required: 'Need upload image of product'})}
              type='file' 
              id='product' 
              multiple
            />
            {errors['images'] && <small className='text-xs text-red-500'>{errors['product']?.message}</small>}
          </div>

          {preview.images?.length > 0 
            && 
          <div className='my-4 flex w-full gap-2 flex-wrap'>
            {
              preview.images?.map((el,index) => (
                <div onMouseEnter={() => setHoverElement(el.name)} onMouseLeave={() => setHoverElement(null)} key={index} className='w-fit relative'>
                  <img src={el.path} alt='image of product' className='w-[200px] object-contain'></img>
                  {hoverElement === el.name && <div className='absolute cursor-pointer animate-scale-up-center inset-0 bg-overlay flex items-center justify-center'  onClick={()=>handleRemoveImage(el.name)}>
                    <RiDeleteBin6Line size={24} color='white'/>
                  </div>}
                </div>
              ))
            }
          </div>
          }

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