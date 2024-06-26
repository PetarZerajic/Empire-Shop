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
  reviews?: [
    {
      _id: string;
      user: string;
      name: string;
      rating: number;
      comment: string;
      createdAt: string;
    }
  ];
  numReviews?: number;
  quantity?: number;
}
