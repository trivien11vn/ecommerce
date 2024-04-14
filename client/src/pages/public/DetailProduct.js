import React ,{useState, useEffect, useCallback}from 'react'
import {useParams} from 'react-router-dom'
import { apiGetOneProduct, apiGetProduct } from '../../apis/product'
import {Breadcrumb, Button, SelectQuantity, ProductExtra, ProductInformation, CustomSlider} from '../../components'
import Slider from "react-slick";
import ReactImageMagnify from 'react-image-magnify';
import { formatPrice, formatPricee, renderStarfromNumber } from '../../ultils/helper';
import {productExtra} from '../../ultils/constant'
import DOMPurify from 'dompurify';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};


const DetailProduct = () => {
  const {pid, title, category} =useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [productCate, setProductCate] = useState(null)

  const [currentImage, setCurrentImage] = useState(null)

  const [update, setUpdate] = useState(false)
  const reRender = useCallback(() => {
      setUpdate(!update)
  },[update])

  const fetchProductData = async ()=>{
    const response = await apiGetOneProduct(pid)
    if(response.success){
      setProduct(response?.product)
      setCurrentImage(response?.product?.thumb)
    }
  }
  const fetchProductCate = async ()=>{
    const response = await apiGetProduct({category})
    if(response.success){
      setProductCate(response.products)
    }
  }
  useEffect(() => {
    if(pid){
      fetchProductData()
      fetchProductCate()
    }
    window.scrollTo(0,0)
  }, [pid])
  useEffect(() => {
    if(pid){
      fetchProductData()
    }
  }, [update])
  
  const handleClickImage = (e,el) => {
    e.stopPropagation();
    setCurrentImage(el)
  }

  const editQuantity = useCallback((number)=>{
    if(!Number(number)||Number(number)<1) {
      return
    }
    else{
      setQuantity(Number(number))
    }
  },[quantity])
  const handleChange = useCallback((flag)=>{
    if(flag==='minus'){
      if(quantity>=2) setQuantity(prev => prev-1)
    }
    else{
      setQuantity(prev => prev+1)
    }
  },[quantity])
  return (
    <div className='w-full'> 
      <div className='h-[81px] flex items-center justify-center bg-gray-100'>
        <div className='w-main'>
          <h3 className='font-semibold'>{title}</h3>
          <Breadcrumb title={title} category={category} />
        </div>
      </div>
      <div className='w-main m-auto mt-4 flex'>
        <div className='flex flex-col gap-4 w-2/5'>
          <div className='h-[458px] w-[458px] border overflow-hidden flex items-center'>
            <ReactImageMagnify {...{
              smallImage: {
                  alt: 'Wristwatch by Ted Baker London',
                  isFluidWidth: true,
                  src: currentImage
              },
              largeImage: {
                  src: currentImage,
                  width: 1200,
                  height: 1200
              },
            }} />
          </div>
          {/* <img src={product?.image} alt='product' className='border h-[458px] w-[458px] object-cover' /> */}
          <div className='w-[458px]'>
            <Slider className='image_slider flex gap-2'{...settings}>
              {product?.image?.map(el => (
                <div key={el}>
                  <img onClick={e=> handleClickImage(e,el)} src={el} alt="sup_product" className='cursor-pointer border h-[141px] w-[141px] object-cover'/>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className='w-2/5 pr-[24px] flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-[30px] font-semibold'>
              {`${formatPrice(formatPricee(product?.price))} VNĐ`}
            </h2>
            <span className='text-sm text-main'> 
              {`In stock: ${product?.quantity}`}
            </span>
          </div>
          <div className='flex items-center gap-1'>
            {renderStarfromNumber(product?.totalRatings)?.map((el, index)=>(
              <span key={index}>{el}</span>
            ))}
            <span className='text-sm text-main'>
              {`(Sold: ${product?.soldQuantity})`}
            </span>
          </div>
          <ul className='text-sm text-gray-500 list-square pl-4'>
            {product?.description?.length > 1 
              &&
            product?.description?.map(el=>(
              <li className=' leading-6' key={el}>{el}</li>
            )) }
            {product?.description?.length === 1 
              &&
            <div className='text-sm line-clamp-[10] mb-8' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(product?.description[0])}}></div>}
          </ul>
          <div className='flex flex-col gap-8'>
            <div className='flex items-center gap-4'>
              <span className='font-semibold'>Quantity: </span>
              <SelectQuantity quantity={quantity} editQuantity={editQuantity} handleChange={handleChange} />
            </div>
            <Button fullWidth>
              Add to cart
            </Button>
          </div>
        </div>
        <div className='w-1/5'> 
          {productExtra.map(el =>(
            <ProductExtra key={el.id} title={el.title} icon={el.icon} sup={el.sup}/>
          ))}
        </div>
      </div>
      <div className='w-main m-auto mt-[8px]'>
        <ProductInformation ratings={product?.rating} totalRatings={product?.totalRatings} nameProduct={product?.title} pid={product?._id} reRender={reRender}/>
      </div>
      <div className='w-main m-auto mt-[8px]'>
        <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>OTHER CUSTOMERS ALSO BUY:</h3>
        <CustomSlider products={productCate} normal={true}/>
      </div>
      <div className='h-[100px] w-full'></div>
    </div>
  )
}

export default DetailProduct