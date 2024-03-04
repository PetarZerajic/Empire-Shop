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
  useDeliverOrderMutation,
} from "../../redux/slices/orderApiSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { MakeErrorMessage } from "../../utils/makeErrorMessage";

export const Order = () => {
  const { id } = useParams();

  const { data, isLoading, isSuccess, error, refetch } = useGetOrderQuery(id);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const { userInfo } = useSelector((state: RootState) => state.reducer.auth);

  const orderDetails: IOrder = data?.data?.order;

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
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
    }
  }, [errorPayPal, orderDetails, loadingPayPal, paypal, paypalDispatch]);

  const { errMessage } = MakeErrorMessage({ error });

  const onApprove = (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    return actions.order!.capture().then(async (details) => {
      try {
        await payOrder({ id, details });
        refetch();
        toast.success("Payment successfull");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(err.data.message || err.message);
      }
    });
  };

  const onError = (err: unknown) => {
    if (err instanceof Error) toast.error(err.message);
  };
  const createOrder = (data: CreateOrderData, actions: CreateOrderActions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: orderDetails.totalPrice.toString(),
            },
          },
        ],
      })
      .then((id) => {
        return id;
      });
  };
  const handleDeliverOrder = async () => {
    try {
      await deliverOrder(id);
      refetch();
      toast.success("Order delivered");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.data.message || err.message);
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
                      Delivered on : {orderDetails.deliveredAt}
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
                      Paid on {orderDetails.paidAt}
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
                        <>
                          <PayPalButtons
                            onApprove={onApprove}
                            createOrder={createOrder}
                            onError={onError}
                          />
                        </>
                      )}
                    </ListGroup.Item>
                  )}

                  {userInfo &&
                    userInfo.data.user.role === "admin" &&
                    orderDetails.isPaid &&
                    !orderDetails.isDelivered && (
                      <ListGroup.Item>
                        <Button type="button" onClick={handleDeliverOrder}>
                          {loadingDeliver ? (
                            <Loader width={30} height={30} />
                          ) : (
                            "Mark as delivered"
                          )}
                        </Button>
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
