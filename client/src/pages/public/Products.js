import React, {useEffect, useState} from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Breadcrumb, Product} from '../../components'
import { apiGetProduct } from '../../apis'
import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const Products = () => {
  const [products, setProducts] = useState(null)
  const {category} = useParams()
  const fetchProductCategories = async (queries) =>{
    const response = await apiGetProduct(queries)
    if(response.success) setProducts(response.products)
  }
  useEffect(() => {
    fetchProductCategories()
  }, [])
  


  return (
    <div className='w-full'>
      <div className='h-[81px] flex items-center justify-center bg-gray-100'>
        <div className='w-main'>
          <h3 className='font-semibold uppercase'>{category}</h3>
          <Breadcrumb category={category} />
        </div>
      </div>
      <div className='w-main border p-4 flex justify-between m-auto mt-8'>
        <div className='w-4/5 flex-auto'>
          filter
        </div>
        <div className='w-1/5 flex-auto'>
          short
        </div>
      </div>
      <div className='mt-8 w-main m-auto'>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex mx-[-10px]"
          columnClassName="my-masonry-grid_column m">
          {products?.map(el => (
            <Product 
              key={el.id} 
              productData={el}
              pid= {el.id}
              normal={true}
            />
          ))}
        </Masonry>
      </div>
      <div className='w-full h-[500px]'>
      </div>
    </div>
  )
}

export default Products