import { Link } from "react-router-dom";
import { IOrder } from "../../interfaces/IOrder";
import { ListGroup, Row, Col, Image } from "react-bootstrap";

export const OrderItems = ({ orderDetails }: { orderDetails: IOrder }) => {
  return (
    <>
      <h2>Order Items</h2>
      {orderDetails.orderItems.map((item) => (
        <ListGroup.Item key={item._id}>
          <Row>
            <Col md={1}>
              <Image src={`/images/products/${item.imageCover}`} alt={item.name} fluid rounded />
            </Col>
            <Col>
              <Link to={`/product/${item._id}`}>{item.name}</Link>
            </Col>
            <Col md={4}>
              {item.quantity} x ${item.price} = ${item.quantity * item.price}
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </>
  );
};
