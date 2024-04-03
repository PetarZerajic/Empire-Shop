import { Loader } from "../../../components/loader/loader";
import { Message } from "../../../components/message/message";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
} from "../../../redux/slices/orderApiSlice";
import { MakeErrorMessage } from "../../../utils/makeErrorMessage";
import { toast } from "react-toastify";
import { Meta } from "../../../components/meta/meta";
import { OrderTable } from "../../../components/tables/order/orderTable";
import "./orderList.css";

export const OrderList = () => {
  const {data: orders, refetch, isLoading, isSuccess, error} = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();

  const deleteOrderHandler = async (_id: string) => {
    try {
      if (confirm("Are you sure?")) {
        await deleteOrder(_id).unwrap();
        refetch();
        toast.success("Successfully deleted");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.data.message || err.error);
    }
  };

  const { errMessage } = MakeErrorMessage({ error });

  return (
    <>
    <Meta title="Orders"/>
      <h1>Orders</h1>
        {isLoading && <Loader width={100} height={100} />}
        {error && <Message variant="danger">{errMessage}</Message>}
        {isSuccess &&  <OrderTable orders={orders} deleteOrderHandler={deleteOrderHandler}/>}
    </>
  );
};
