import React from 'react'
import {useParams} from 'react-router-dom'

const DetailProduct = () => {
  const {pid, title} =useParams()
  return (
    <div>detail</div>
  )
}

export default DetailProduct