import React from 'react'
import Slider from "react-slick";
import {Product} from './'
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
const CustomSlider = ({products, activeTab}) => {
  return (
    <>
        {products &&<Slider {...settings}>
            {products?.map(el =>(
                <Product key={el._id} 
                    productData={el}
                    isNew={ activeTab === 1 ? false : true}
                    pid= {el.id}
                />
            ))}
        </Slider>}
    </>
  )
}

export default CustomSlider