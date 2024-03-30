import { IOrder } from '../../../interfaces/IOrder';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTimes, FaTrash } from 'react-icons/fa';


interface IProps {
    orders: { data: {order:IOrder[]} } | undefined;
    deleteOrderHandler(id:string):void
  }

export const OrderTable = ({ orders, deleteOrderHandler }: IProps) => {
  return (
    <>
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
            {orders?.data.order.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.name}</td>
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
                  <Button
                    variant="light"
                    className="btn-sm mx-2"
                    onClick={() => deleteOrderHandler(order._id)}
                  >
                    <FaTrash id="trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </>
  )
}
