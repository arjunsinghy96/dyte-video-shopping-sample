import axios from "axios";

const BASE_URL = 'https://fakestoreapi.com'

interface IProduct {
  id: number;
  title: string;
  rating: {rate: number},
  price: number,
  image?: URL
}

export const listProudcts = async (): Promise<IProduct[]> => {
  const response = await axios.get(`${BASE_URL}/products/`)
  return response.data;
}

export const getProduct = async (id: number): Promise<IProduct> => {
  const response = await axios.get(`${BASE_URL}/products/${id}/`);
  return response.data;
}
