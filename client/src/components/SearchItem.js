import React, { memo, useEffect, useState} from 'react'
import icons from '../ultils/icon'
import { colors } from '../ultils/constant'
import { createSearchParams, useNavigate, useParams} from 'react-router-dom'
import path from '../ultils/path'
import { apiGetProduct } from '../apis'
const {FaCaretDown} = icons
const SearchItem = ({name, activeClick, changeActiveFilter, type='checkbox'}) => {
  const navigate = useNavigate()
  const {category} = useParams()
  const [selected, setSelected] = useState([])
  const [bestPrice, setBestPrice] = useState(null)

  const [price, setPrice] = useState([0,0])

  const handleSelected = (e) => {
    const alreadyEl = selected?.find(el => el === e.target.value)
    if(alreadyEl) setSelected(prev => prev.filter(el => el !== e.target.value))
    else setSelected(prev => [...prev, e.target.value])
    changeActiveFilter(null)
  }
  useEffect(() => {
    if(selected.length > 0){
      navigate({
      pathname: `/${category}`,
      search: createSearchParams({
        color: selected.join(',')
      }).toString()
      })    
    }
    else{
      navigate(`/${category}`)
    }
  }, [selected])
  
  useEffect(() => {
    // const validPrice = price.filter(el => +el > 0)
    // if(price.from > 0){
    //   navigate({
    //   pathname: `/${category}`,
    //   search: createSearchParams({
    //     color: validPrice
    //   }).toString()
    //   })    
    // }
    console.log(price)
  }, [price])
  
  const fetchHighestPrice = async() =>{
    const response = await apiGetProduct({sort:'-price', limit:1})
    if(response.success){
      setBestPrice(response.products[0]?.price)
    }
  }
  //goi 1 lan duy nhat thoi
  useEffect(() => { 
    if(type==='input') fetchHighestPrice()
   },[])
  
  return (
    <div 
    onClick={()=>changeActiveFilter(name)}
    className='cursor-pointer text-gray-500  p-3 text-xs relative border border-gray-800 flex gap-6 justify-between items-center'>
        <span className='capitalize'>{name}</span>
        <FaCaretDown />
        {activeClick === name && <div className='absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white min-w-[150px]'>
            {type === 'checkbox' && 
              <div className=''>
                <div className='p-4 items-center flex justify-between gap-8 border-b'>
                  <span className='whitespace-nowrap'>
                    {`${selected.length} selected`}
                  </span>
                  <span onClick={e=>{
                    e.stopPropagation() 
                    setSelected([])}} className='cursor-pointer underline hover:text-main'>Reset</span>
                </div>
                <div onClick={e=> e.stopPropagation()} className='flex flex-col gap-3 mt-4'>
                {
                  colors.map((el,index)=>(
                    <div key={index} className='flex items-center gap-4'>
                      <input type='checkbox' onChange={handleSelected} id={el} value={el} checked={selected.some(selectedItem => selectedItem===el)}/>
                      <label className='capitalize text-gray-700' htmlFor={el}>{el}</label>
                    </div>
                  ))
                }
                </div>
              </div>
            }
            {type === 'input' &&
              <div onClick={e=>e.stopPropagation()}>
                <div className='p-4 items-center flex justify-between gap-8 border-b'>
                  <span className='whitespace-nowrap'>
                    {`The highest price is ${Number(bestPrice).toLocaleString()} VND`}
                  </span>
                  <span onClick={e=>{
                    e.stopPropagation() 
                    setSelected([])}} className='cursor-pointer underline hover:text-main'>Reset</span>
                </div>
                <div className='flex items-center p-2 gap-2'>
                  <div className='flex items-center gap-2'>
                    <label htmlFor='From'>From</label>
                    <input 
                      className='form-input' 
                      type="number" 
                      id="From"
                      value={price[0]}
                      onChange={e=> setPrice(prev => prev.map((el,index) =>  index === 0 ? e.target.value : el))}
                    />
                  </div>
                  <div className='flex items-center gap-2'>
                    <label htmlFor='To'>To</label>
                    <input 
                      className='form-input' 
                      type="number" 
                      id="To"
                      value={price[1]}
                      onChange={e=> setPrice(prev => prev.map((el,index) =>  index === 1 ? e.target.value : el))}
                    />
                  </div>
                </div>
              </div>
            }
        </div>}
    </div>
  )
}

export default memo(SearchItem)