import { Message } from "../message/message";
import { IOrder } from "../../interfaces/IOrder";

export const OrderShipping = ({ orderDetails }: { orderDetails: IOrder }) => {
  return (
    <>
      <h2>Shipping</h2>
      <p style={{ marginTop: "20px" }}>
        <strong>Name: </strong>
        {orderDetails.user.name}
      </p>
      <p>
        <strong>Email: </strong> {orderDetails.user.email}
      </p>
      <p>
        <strong>Address: </strong>
        {orderDetails.shippingAddress.address},
        {orderDetails.shippingAddress.city},
        {orderDetails.shippingAddress.postalCode},
        {orderDetails.shippingAddress.country}
      </p>
      {orderDetails.isDelivered ? (
        <Message variant="success">
          Delivered on : {orderDetails.deliveredAt}
        </Message>
      ) : (
        <Message variant="info">Not delivered</Message>
      )}
    </>
  );
};
