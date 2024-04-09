import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  Row, Col, ListGroup, Image } from "react-bootstrap";
import { CheckoutSteps } from "../../components/checkout-steps/checkoutSteps";
import { RootState } from "../../redux/store/store";
import { Routes } from "../../router/routes";
import { emptyShippingFields } from "../../utils/emptyShippingFields";
import { useCreateOrderMutation } from "../../redux/slices/orderApiSlice";
import { clearCartItems } from "../../redux/slices/cartSlice";
import { PlaceorderCard } from "../../components/card/placeorder/placeorderCard";
import "./placeorder.css";

export const Placeorder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.reducer.cart);

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  useEffect(() => {
    if (emptyShippingFields(cart.shippingAddress)) {
      navigate(Routes.Shipping);
    }
  }, [cart.shippingAddress, navigate]);

  const placeOrderHandler = async () => {
    try {
      const response = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${response.data.order._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>

              <ListGroup variant="flush">
                {cart.cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image
                          src={`images/products/${item.imageCover}`}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        <p>
                          {item.quantity} x ${item.price} =
                          {item.quantity! * item.price}
                        </p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <PlaceorderCard itemsPrice={cart.itemsPrice} shippingPrice={cart.shippingPrice} totalPrice={cart.totalPrice} 
          taxPrice={cart.taxPrice} isLoading={isLoading} placeOrderHandler={placeOrderHandler}/>
        </Col>
      </Row>
    </>
  );
};
