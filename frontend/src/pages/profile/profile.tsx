import { Button, Row, Col, Form, Table } from "react-bootstrap";
import { Loader } from "../../components/loader/loader";
import { toast } from "react-toastify";
import { setUserInfo } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  useProfileMutation,
  useUpdatePasswordMutation,
} from "../../redux/slices/userApiSlice";
import "./profile.css";
import { useGetMyOrdersQuery } from "../../redux/slices/orderApiSlice";
import { Message } from "../../components/message/message";
import { IOrder } from "../../interfaces/IOrder";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

export const Profile = () => {
  const { userInfo } = useSelector((state: RootState) => state.reducer.auth);
  const { name, email } = userInfo!.data.user;
  const [inputValues, setInputValues] = useState({
    name: name,
    email: email,
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const [updatePassword, { isLoading: loadingUpdatePassword }] =
    useUpdatePasswordMutation();
  const { data: orders, error } = useGetMyOrdersQuery("Order");
  console.log(orders);
  const dispatch = useDispatch();
  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const { name, email, passwordCurrent, password, passwordConfirm } =
      inputValues;
    if (password !== passwordConfirm) {
      return toast.error("Password do not match!");
    }
    try {
      if (passwordCurrent && password && passwordConfirm) {
        const response = await updatePassword({
          password,
          passwordConfirm,
          passwordCurrent,
        }).unwrap();
        dispatch(setUserInfo(response));
        toast.success("Password updated successfully!");
      } else {
        const response = await updateProfile({
          name,
          email,
        }).unwrap();

        dispatch(setUserInfo(response));
        toast.success("Profile updated successfully!");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      toast.error(err.data.message || err.error);
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Row>
      <Col md={3}>
        <Form onSubmit={submitHandler}>
          <h2>User Profile</h2>
          <Form.Group className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={inputValues.name}
              onChange={onChangeHandler}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={inputValues.email}
              onChange={onChangeHandler}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              name="passwordCurrent"
              value={inputValues.passwordCurrent}
              onChange={onChangeHandler}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={inputValues.password}
              onChange={onChangeHandler}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Password Confirm</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="passwordConfirm"
              value={inputValues.passwordConfirm}
              onChange={onChangeHandler}
              autoComplete="off"
            />
          </Form.Group>
          <Button type="submit">
            {loadingUpdateProfile || loadingUpdatePassword ? (
              <Loader width={30} height={30} />
            ) : (
              "Update"
            )}
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {error && <Message variant="danger">{error}</Message>}
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
            {orders?.data.map((order: IOrder) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>{order.paidAt.substring(0, 10)}</td>
                <td>
                  {order.deliveredAt ? (
                    order.deliveredAt.substring(0.1)
                  ) : (
                    <FaTimes
                      style={{
                        color: "red",
                        marginLeft: "30px",
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
      </Col>
    </Row>
  );
};
