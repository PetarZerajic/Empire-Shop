import { Button, Table } from "react-bootstrap";
import { Loader } from "../../../components/loader/loader";
import { Message } from "../../../components/message/message";
import { useGetOrdersQuery } from "../../../redux/slices/orderApiSlice";
import { MakeErrorMessage } from "../../../utils/makeErrorMessage";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./orderList.css";

export const OrderList = () => {
  const { data: orders, isLoading, isSuccess, error } = useGetOrdersQuery();
  const { errMessage } = MakeErrorMessage({ error });
  return (
    <>
      <h1>Orders</h1>
      {isLoading && <Loader width={100} height={100} />}
      {error && <Message variant="danger">{errMessage}</Message>}
      {isSuccess && (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.data.order.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
