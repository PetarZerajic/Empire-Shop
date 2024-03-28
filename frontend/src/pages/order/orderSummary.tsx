import { Card, Col, ListGroup, Row, Button } from "react-bootstrap";
import { Loader } from "../../components/loader/loader";
import { IOrder } from "../../interfaces/IOrder";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {
  OnApproveActions,
  OnApproveData,
  CreateOrderData,
  CreateOrderActions,
} from "@paypal/paypal-js";
import { IUserInfo } from "../../interfaces/IUsers";

interface IProps {
  orderDetails: IOrder;
  userInfo: IUserInfo | null;
  loadingPay: boolean;
  loadingDeliver: boolean;
  isPending: boolean;
  onApprove(data: OnApproveData, actions: OnApproveActions): Promise<void>;
  createOrder(data: CreateOrderData, actions: CreateOrderActions): Promise<string>;
  handleDeliverOrder(): void;
  onError(err: unknown): void;
}

export const OrderSummary = (props: IProps) => {
  const {orderDetails, userInfo, loadingPay, loadingDeliver, isPending, onApprove, createOrder,handleDeliverOrder, onError} = props;
 
  return (
    <>
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
                <PayPalButtons
                  onApprove={onApprove}
                  createOrder={createOrder}
                  onError={onError}
                />
              )}
            </ListGroup.Item>
          )}

           {userInfo?.data.user.role === "admin" && orderDetails.isPaid && !orderDetails.isDelivered && (
              <ListGroup.Item>
                <Button
                  id="custom-btn"
                  type="button"
                  onClick={handleDeliverOrder}
                >
                  {loadingDeliver ? (<Loader width={30} height={30} />) : ("Mark as delivered")}
                </Button>
              </ListGroup.Item>
            )}
        </ListGroup>
      </Card>
    </>
  );
};
