import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { Message } from "../../components/message/message";
import { Loader } from "../../components/loader/loader";
import { IOrder } from "../../interfaces/IOrder";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  OnApproveActions,
  OnApproveData,
  CreateOrderData,
  CreateOrderActions,
} from "@paypal/paypal-js";
import {
  useGetOrderQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/slices/orderApiSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const Order = () => {
  const { id } = useParams();
  const { data, isLoading, isSuccess, error } = useGetOrderQuery(id);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
    refetch,
  } = useGetPayPalClientIdQuery("Order");

  const orderDetails: IOrder = data?.data?.order;

  useEffect(() => {
    enum SCRIPT_LOADING_STATE {
      PENDING = "pending",
    }

    const loadPaypalScript = async () => {
      paypalDispatch({
        type: "resetOptions",
        value: {
          clientId: paypal.clientId,
          currency: "USD",
        },
      });
      paypalDispatch({
        type: "setLoadingStatus",
        value: SCRIPT_LOADING_STATE.PENDING,
      });
    };
    if (orderDetails && !orderDetails.isPaid) {
      if (!window.paypal) {
        loadPaypalScript();
      }
    }
  }, [errorPayPal, loadingPayPal, orderDetails, paypal, paypalDispatch]);
  let errMessage;

  if (error) {
    if ("status" in error) {
      errMessage =
        "data" in error
          ? JSON.stringify((error.data as { message: string }).message)
          : error.error;
    }
  }

  const onApprove = (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    if (actions.order) {
      return actions.order.capture().then(async (details) => {
        try {
          await payOrder({ id, details });
          refetch();
          toast.success("Payment successfull");
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          toast.error(err.data.message || err.message);
        }
      });
    } else {
      return Promise.reject(new Error("actions.order is undefined"));
    }
  };

  const onApproveTest = async () => {
    await payOrder({ id, details: { payer: {} } });
    refetch();
    toast.success("Payment successfull");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (err: Record<string, any>) => {
    toast.error(err.message);
  };
  const createOrder = (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    if (actions.order) {
      return actions.order
        ?.create({
          purchase_units: [
            {
              amount: {
                value: orderDetails.totalPrice.toString(),
              },
            },
          ],
        })
        .then((orderId) => {
          return orderId;
        });
    } else {
      return Promise.reject(new Error("actions.order is undefined"));
    }
  };

  return (
    <>
      {isLoading && <Loader width={100} height={100} />}
      {error && <Message variant="danger">{errMessage}</Message>}
      {isSuccess && (
        <>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
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
                      Delivered on : {orderDetails.deliveredAt.toString()}
                    </Message>
                  ) : (
                    <Message variant="info">Not delivered</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment method</h2>
                  <p>
                    <strong>Method: </strong> {orderDetails.paymentMethod}
                  </p>
                  {orderDetails.isPaid ? (
                    <Message variant="success">
                      Paid on {orderDetails.paidAt.toString()}
                    </Message>
                  ) : (
                    <Message variant="info">Not Paid </Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {orderDetails.orderItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={`/images/products/${item.imageCover}`}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = $
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${orderDetails.itemsPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${orderDetails.shippingPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${orderDetails.taxPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Total</Col>
                      <Col>${orderDetails.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!orderDetails.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader width={30} height={30} />}
                      {isPending ? (
                        <Loader width={30} height={30} />
                      ) : (
                        <div>
                          <Button
                            onClick={onApproveTest}
                            style={{ marginBottom: "10px" }}
                          >
                            Test Pay Order
                          </Button>
                          <div>
                            <PayPalButtons
                              onApprove={onApprove}
                              createOrder={createOrder}
                              onError={onError}
                            />
                          </div>
                        </div>
                      )}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
