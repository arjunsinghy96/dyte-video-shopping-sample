import React from "react"
import { IProduct } from "../types/product";

interface ProductCardProps {
  product: IProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, rating, price, image } = product

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow flex flex-col">
      <div className="h-48">
        <img className="p-8 rounded-t-lg object-scale-down h-full mx-auto" src={image + ''} alt="product image" />
      </div>
      <div className="px-5 pb-5 flex flex-col flex-1">
        <a href="#">
          <h5 className="text-lg font-semibold tracking-tight text-gray-900">{title.slice(0, 100)}</h5>
        </a>
        <div className="flex mt-2.5 mb-2 flex-grow flex-wrap">
          {[...Array(Math.round(rating.rate)).keys()].map((key) => {
            return <svg key={key} aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          })}
          {[...Array(5 - Math.round(rating.rate)).keys()].map((key) => {
            return <svg key={key} aria-hidden="true" className="w-5 h-5 text-slate-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          })}
          <span className="h-5 bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">{rating.rate}</span>
        </div>
        <div className="text-xl font-bold text-gray-900 dark:text-white mb-auto">${price}</div>
        <div className="flex items-center space-x-4 justify-end pt-3 border-t justify-self-end">
          <a
            href="#"
            className="flex flex-row text-white rounded-full px-3 py-2 bg-yellow-600 items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 text-sm font-bold">Add to Cart</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
