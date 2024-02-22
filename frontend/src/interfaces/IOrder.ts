export interface IOrder {
  _id: string;
  itemsPrice: number;
  orderItems: [
    {
      _id: string;
      imageCover: string;
      name: string;
      price: number;
      quantity: number;
    }
  ];
  paymentMethod: string;
  shippingAddress: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  createdAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  paidAt: Date;
  updatedAt: string;
  deliveredAt: Date;
  user: {
    email: string;
    name: string;
    _id: string;
  };
}
