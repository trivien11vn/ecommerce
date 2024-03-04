import React, {useState, useEffect} from 'react'
import {apiGetProduct} from '../apis/product'
import {Product} from './'
import Slider from "react-slick";
const tabs = [
    {
        id: 1,
        name: 'best seller'
    },
    {
        id: 2,
        name: 'new arrivals'
    },
]
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

const BestSeller = () => {
    const [bestSeller, setBestSeller] = useState(null)
    const [newProduct, setNewProduct] = useState(null)
    const [activeTab, setActiveTab] = useState(1)
    const [product, setProduct] = useState(null)
    const fetchProduct =  async() =>{
        const response = await Promise.all([apiGetProduct({sort:'-sold'}),apiGetProduct({sort:'-createdAt'})])
        if(response[0]?.success){
            setBestSeller(response[0].products)
            setProduct(response[0].products)}
        if(response[1]?.success){setNewProduct(response[1].products)}
    }
    useEffect(()=>{
        fetchProduct()
    },[])

    useEffect(()=>{
        if(activeTab===1) setProduct(bestSeller)
        else if(activeTab===2) setProduct(newProduct)
    },[activeTab])
  return (
    <div>
        <div className='flex text-[20px] ml-[-32px]'>
            {tabs.map(el => (
                <span 
                    key={el.id} 
                    className={`font-semibold capitalize px-8 border-r text-gray-400 cursor-pointer ${activeTab === el.id ? 'text-gray-900': ''}`}
                    onClick={()=> setActiveTab(el.id)}>
                    {el.name}
                </span>
            ))}
        </div>
        <div className='mt-4 mx-[-10px] border-t-2 border-main pt-4'>
            <Slider {...settings}>
                {product?.map(el =>(
                    <Product key={el.id} 
                        productData={el}
                        isNew={ activeTab === 1 ? false : true}
                        pid= {el.id}
                    />
                ))}
            </Slider>
        </div>
        <div className='w-full flex gap-4 mt-4'>
            <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
                className='flex-1 object-contain'
            />
            <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
                className='flex-1 object-contain'
            />
        </div>
    </div>

  )
}

export default BestSeller