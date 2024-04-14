import React, {useEffect, useState} from 'react'
import { InputForm, Pagination} from 'components'
import { useForm } from 'react-hook-form'
import { apiGetProduct } from 'apis/product'
import moment from 'moment'
import { useSearchParams, createSearchParams, useNavigate, useLocation} from 'react-router-dom'
import useDebounce from 'hook/useDebounce'

const ManageProduct = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const {register,formState:{errors}, handleSubmit, reset, watch} = useForm()
  const [products, setProducts] = useState(null)
  const [counts, setCounts] = useState(0)
  const handleSearchProduct = (data) => {
    console.log(data)
  }

  const fetchProduct = async(params) => {
    const response = await apiGetProduct({...params, limit: process.env.REACT_APP_LIMIT})
    if(response.success){
      setProducts(response.products)
      setCounts(response.counts)
    }
  }

  const queryDebounce = useDebounce(watch('q'),800)
  useEffect(() => {
    const searchParams = Object.fromEntries([...params]) 
    fetchProduct(searchParams)
  }, [params])

  useEffect(() => {
    if(queryDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({q:queryDebounce}).toString()
      })
    }
    else{
      navigate({
        pathname: location.pathname,
      })
    }
  }, [queryDebounce])
  
  
  console.log(params.get('page'))
  return (
    <div className='w-full flex flex-col gap-4 relative'>
      <div className='h-[69px] w-full'>

      </div>
      <div className='p-4 border-b w-full flex justify-between items-center fixed top-0 bg-black'>
        <h1 className='text-3xl font-bold tracking-tight'>ManageProduct</h1>
      </div>

      <div className='flex w-full justify-end items-center px-4 '>
        <form className='w-[45%]' onSubmit={handleSubmit(handleSearchProduct)}>
          <InputForm
            id='q'
            register={register}
            errors={errors}
            fullWidth
            placeholder= 'Search product by title, description ...'
          >
            
          </InputForm>
        </form>
      </div>
      <table className='table-auto p-0'>
        <thead className='font-bold bg-blue-500 text-[13px] text-white'>
          <tr className='border border-gray-500'>
            <th className='text-center py-2'>#</th>
            <th className='text-center py-2'>Thumb</th>
            <th className='text-center py-2'>Title</th>
            <th className='text-center py-2'>Brand</th>
            <th className='text-center py-2'>Category</th>
            <th className='text-center py-2'>Price</th>
            <th className='text-center py-2'>Quantity</th>
            <th className='text-center py-2'>Sold</th>
            <th className='text-center py-2'>Color</th>
            <th className='text-center py-2'>Ratings</th>
            <th className='text-center py-2'>Update</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((el,idx)=>(
            <tr key={el._id} className='border border-gray-500'>
              <td className='text-center py-2'>{((+params.get('page')||1)-1)*+process.env.REACT_APP_LIMIT + idx + 1}</td>
              <td className='text-center py-2'><img src={el.thumb} alt='thumb' className='w-12 h-12 object-cover'></img></td>
              <td className='text-center py-2'>{el.title}</td>
              <td className='text-center py-2'>{el.brand}</td>
              <td className='text-center py-2'>{el.category}</td>
              <td className='text-center py-2'>{el.price}</td>
              <td className='text-center py-2'>{el.quantity}</td>
              <td className='text-center py-2'>{el.soldQuantity}</td>
              <td className='text-center py-2'>{el.color}</td>
              <td className='text-center py-2'>{el.totalRatings}</td>
              <td className='text-center py-2'>{moment(el.updatedAt).format('DD/MM/YYYY')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='w-full flex justify-end'>
        <Pagination totalCount={counts} />
      </div>
    </div>
  )
}

export default ManageProduct