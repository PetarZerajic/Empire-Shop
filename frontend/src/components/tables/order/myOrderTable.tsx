import { Button, Table } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit/react";
import { Message } from "../../message/message";
import { IOrder } from "../../../interfaces/IOrder";

interface IProps {
  error: FetchBaseQueryError | SerializedError | undefined;
  errMessage: string | undefined;
  orders: { data: IOrder[] } | undefined;
}


export const MyOrderTable = ({ error, errMessage, orders }: IProps) => {
    return (
        <>
          <h2>My Orders</h2>
          {error && <Message variant="danger">{errMessage}</Message>}
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.data.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>{order.paidAt?.substring(0, 10)}</td>
                  <td>
                    {order.deliveredAt ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes
                        style={{
                          color: "red",
                        }}
                      />
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      );
}
