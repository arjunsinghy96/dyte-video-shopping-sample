export interface IProduct {
  id: number;
  title: string;
  rating: {rate: number},
  price: number,
  image?: URL
}
