import React, {useState, useEffect} from 'react' 
import {ProductCard} from './'
import {apiGetProduct} from '../apis'
const FeaturedProduct = () => {
    const [product, setProduct] = useState(null)
    const fetchProduct = async ()=>{
        const response = await apiGetProduct({limit:9})
        if(response.success){
            console.log(response)
            setProduct(response.products)
        }
    }
    useEffect(()=>{
        fetchProduct();
    }, [])
  return (
    <div className='w-full'>
        <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>FEATURED PRODUCT</h3>
        <div className='flex flex-wrap mt-[15px] mx-[-10px]'>
            {product?.map(el => (
                <ProductCard 
                    key={el._id}
                    image = {el.thumb}
                    title = {el.title}
                    totalRating = {el.totalRatings}
                    price = {el.price}
                />
            ))}
        </div>
        <div className='flex justify-between'>
            <img 
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
            className='w-[49%] object-contain'
            alt=""></img>
            <div className='flex flex-col justify-between gap-4 w-[24%]'>
            <img 
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
            alt=""></img>
            <img 
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
            alt=""></img>
            </div>
            <img 
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
            className='w-[24%] object-contain'
            alt=""></img>
        </div>
    </div>
  )
}

export default FeaturedProduct