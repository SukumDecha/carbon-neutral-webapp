import { Truck } from 'lucide-react';
import React from 'react'

interface IProduct {
  title: string;
  img: string;
  point: number;
  description: string;
  quantity: number;
}

interface IProps {
  product: IProduct;
}

const ProductScreen = ({ product }: IProps) => {
  return (
    <div className='product'>
      <img src={product.img} alt={product.title} />
      <div className='radian'></div>
      <p className='title'>{product.title}</p>
      <p className='title'>{product.point} Point</p>
      <p>Quantity : {product.quantity}</p>
      <p>{product.description}</p>
      <div className='Free'>Free Shipping <Truck /></div>
      
        
    </div>
  )
}

export default ProductScreen