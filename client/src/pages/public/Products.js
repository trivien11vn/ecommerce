import React, {useEffect, useState, useCallback} from 'react'
import { useParams, useSearchParams, createSearchParams, useNavigate} from 'react-router-dom'
import { Breadcrumb, Product, SearchItem, InputSelect} from '../../components'
import { apiGetProduct } from '../../apis'
import Masonry from 'react-masonry-css'
import { sorts } from '../../ultils/constant'

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const Products = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState(null)
  const [active, setActive] = useState(null)
  const [params] = useSearchParams()
  const [sort, setSort] = useState('')

  const {category} = useParams()
  const fetchProductCategories = async (queries) =>{
    const response = await apiGetProduct(queries)
    if(response.success) setProducts(response.products)
  }

  useEffect(() => {
    let param = []
    for (let i of params.entries()) param.push(i)
    const queries = {}
    for(let i of param){
      queries[i[0]] = i[1]
    }
    let priceQuery = {}
    if(queries.to || queries.from){
      priceQuery = {$and: [
        {price: {gte: queries.from}},
        {price: {lte: queries.to}},
      ]}
      delete queries.from
      delete queries.to
    }
    fetchProductCategories({...priceQuery,...queries})
  }, [params])
  
  const changeActive = useCallback((name)=>{
    if(name===active) setActive(null)
    else {
      setActive(name)
    }
  },[active])

  const changeValue = useCallback((value)=>{
    setSort(value)
  },[sort])

  useEffect(() => {
    navigate({
      pathname: `/${category}`,
      search: createSearchParams({
        sort
      }).toString()
      })    
  }, [sort])
  
  return (
    <div className='w-full'>
      <div className='h-[81px] flex items-center justify-center bg-gray-100'>
        <div className='w-main'>
          <h3 className='font-semibold uppercase'>{category}</h3>
          <Breadcrumb category={category} />
        </div>
      </div>
      <div className='w-main border p-4 flex justify-between m-auto mt-8'>
        <div className='w-4/5 flex-auto flex flex-col gap-3'>
          <span className='font-semibold text-sm'>Filter by:</span>
          <div className='flex items-center gap-4'>
          <SearchItem name='price' activeClick={active} changeActiveFilter={changeActive} type='input'/>
          <SearchItem name='color' activeClick={active} changeActiveFilter={changeActive}/>
          </div>
        </div>
        <div className='w-1/5 flex flex-col gap-3'>
          <span className='font-semibold text-sm'>Sort by:</span>
          <div className='w-full'> 
            <InputSelect value={sort} options={sorts} changeValue={changeValue} />
          </div>
        </div>
      </div>
      <div className='mt-8 w-main m-auto'>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex mx-[-10px]"
          columnClassName="my-masonry-grid_column">
          {products?.map(el => (
            <Product 
              key={el._id} 
              productData={el}
              pid= {el._id}
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