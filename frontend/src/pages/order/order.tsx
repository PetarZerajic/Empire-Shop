import { useParams } from "react-router-dom";
import { Row, Col, ListGroup } from "react-bootstrap";
import { Message } from "../../components/message/message";
import { Loader } from "../../components/loader/loader";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  OnApproveActions,
  OnApproveData,
  CreateOrderData,
  CreateOrderActions,
} from "@paypal/paypal-js";
import {
  useGetOneOrderQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from "../../redux/slices/orderApiSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { MakeErrorMessage } from "../../utils/makeErrorMessage";
import { OrderShipping } from "../../components/order/orderShipping";
import { OrderPaymentMethod } from "../../components/order/orderPaymentMethod";
import { OrderItems } from "../../components/order/orderItems";
import { OrderCard } from "../../components/card/order/orderCard";
import { clearCartItems } from "../../redux/slices/cartSlice";

export const Order = () => {
  const { id } = useParams();
  const { data, isLoading, isSuccess, error, refetch } = useGetOneOrderQuery(id);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const { userInfo } = useSelector((state: RootState) => state.reducer.auth);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {data: paypal, isLoading: loadingPayPal, error: errorPayPal} = useGetPayPalClientIdQuery();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const orderDetails = data?.data?.order;

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
  const dispatch = useDispatch();
  const onApprove = async(
    _data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    return actions.order!.capture().then(async (details) => {
      try {
        await payOrder({ id, details });
        refetch();
        dispatch(clearCartItems());
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
  const createOrder =async (_data: CreateOrderData, actions: CreateOrderActions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: orderDetails!.totalPrice.toString(),
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
      {isSuccess && orderDetails && (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <OrderShipping orderDetails={orderDetails} />
              </ListGroup.Item>
              <ListGroup.Item>
                <OrderPaymentMethod orderDetails={orderDetails} />
              </ListGroup.Item>
              <ListGroup.Item>
                <OrderItems orderDetails={orderDetails} />
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <OrderCard
              orderDetails={orderDetails}
              userInfo={userInfo}
              loadingPay={loadingPay}
              loadingDeliver={loadingDeliver}
              isPending={isPending}
              onApprove={onApprove}
              createOrder={createOrder}
              handleDeliverOrder={handleDeliverOrder}
              onError={onError}
            />
          </Col>
        </Row>
      )}
    </>
  );
};
