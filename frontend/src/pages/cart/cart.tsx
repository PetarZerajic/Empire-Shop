import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../../components/message/message";
import { RootState } from "../../redux/store/store";
import { addTocart, deleteItem } from "../../redux/slices/cartSlice";
import { IProducts } from "../../interfaces/IProducts";
import { useNavigate } from "react-router-dom";
import "./cart.css";

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state: RootState) => state.reducer.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product: IProducts, quantity: number) => {
    dispatch(addTocart({ ...product, quantity }));
  };

  const handleRemoveFromCart = (_id: string) => {
    dispatch(deleteItem({ _id }));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h1 className="mb-5">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your Cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={`/images/products/${item.imageCover}`}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.quantity}
                      onChange={(e) => addToCartHandler(item, +e.target.value)}
                    >
                      {[...Array(item.countInStock).keys()].map((value) => (
                        <option key={value + 1} value={value + 1}>
                          {value + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="light"
                      type="button"
                      disabled={cartItems.length === 0}
                      onClick={() => handleRemoveFromCart(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4} style={{ marginTop: "100px" }}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce(
                  (acc, currentItem) => acc + currentItem.quantity!,
                  0
                )}
                ) items
              </h2>
              $
              {cartItems
                .reduce(
                  (acc, curentItem) =>
                    acc + curentItem.quantity! * curentItem.price,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item className="mt-2">
              <Button
                type="button"
                className="button"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};
