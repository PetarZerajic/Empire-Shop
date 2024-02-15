import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FormContainer } from "../../components/container/formContainer";
import { Routes } from "../../router/routes";
import { useLoginMutation } from "../../redux/slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { toast } from "react-toastify";
import { showUsersInfo } from "../../redux/slices/authSlice";
import { Loader } from "../../components/loader/loader";

export const Login = () => {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";
  const { userInfo } = useSelector((state: RootState) => state.reducer.auth);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const { email, password } = inputValues;
      const response = await login({ email, password }).unwrap();
      dispatch(showUsersInfo({ ...response }));
      navigate(redirect);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.data.message || err.error, { autoClose: 3000 });
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <FormContainer>
      <h1>Log In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3">
          <Form.Label>Email Adress</Form.Label>
          <Form.Control
            type="email"
            placeholder="example@gmail.com"
            autoComplete="email-adress"
            name="email"
            value={inputValues.email}
            onChange={onChangeHandler}
            required
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            name="password"
            value={inputValues.password}
            onChange={onChangeHandler}
            required
          />
        </Form.Group>
        <Button
          type="submit"
          variant="outline-dark"
          className="mt-2"
          disabled={isLoading}
        >
          {isLoading ? <Loader width={30} height={30} /> : "Log In"}
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Not have an account ? <Link to={Routes.REGISTER}>Sign up here </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
