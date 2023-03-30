import React, { useEffect, useReducer } from "react";

import productImage from '../assets/react.svg';
import ProductCard from "../../components/ProductCard";
import axios from "axios";
import VideoShoppingModal from "../../components/VideoShoppingModal";
import { useNavigate } from "react-router-dom";
import VideoButton from "../../components/VideoButton";
import AppHeader from "../../components/AppHeader";

const reducer = (state: any, action: {
  products: any; type: string;
}) => {
  switch (action.type) {
    case 'set_products':
      return {
        products: action.products
      }
  }

  throw Error('Unknown action: ' + action.type)
}

export default function ProductPage() {
  const [state, dispatch] = useReducer(reducer, { products: [] })
  const navigate = useNavigate()

  useEffect(() => {
    const getProducts = async () => {
      const resp = await axios.get('https://fakestoreapi.com/products')
      dispatch({
        type: 'set_products',
        products: resp.data
      })
      console.log(resp.data)
    }
    getProducts()
  }, [dispatch])

  return (
    <div className="h-[100vh] flex flex-col">
      <AppHeader />
      <div className="grid grid-cols-4 gap-4 mx-auto container mt-5">
        {
          state.products.map((product: {
            image: URL | undefined; id: number; title: string; price: number; rating: { rate: number; };
          }) => {
            return (
              <div
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}>
                < ProductCard
                  product={product}
                />
              </div>
            )
          })
        }
      </div>
      <VideoButton getProductDetails={() => state.products[0]} />
    </div>
  )
}

