export interface IProducts {
  _id: string;
  name: string;
  imageCover: string;
  price: number;
  description: string;
  brand: string;
  category: string;
  countInStock: number;
  rating?: number;
  numReviews?: number;
  quantity?: number;
}
