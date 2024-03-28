import { IOrder } from "../../interfaces/IOrder";
import { Message } from "../../components/message/message";

export const OrderPaymentMethod = ({orderDetails,}: { orderDetails: IOrder}) => {
  return (
    <>
      <h2>Payment method</h2>
      <p>
        <strong>Method: </strong> {orderDetails.paymentMethod}
      </p>
      {orderDetails.isPaid ? (
        <Message variant="success">Paid on {orderDetails.paidAt}</Message>
      ) : (
        <Message variant="info">Not Paid </Message>
      )}
    </>
  );
};
