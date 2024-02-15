import { Form, Button } from "react-bootstrap";
import { FormContainer } from "../../components/container/formContainer";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRegisterMutation } from "../../redux/slices/userApiSlice";
import { Loader } from "../../components/loader/loader";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { showUsersInfo } from "../../redux/slices/authSlice";

export const Register = () => {
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
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
  const [register, { isLoading }] = useRegisterMutation();

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const { name, email, password, passwordConfirm } = inputValues;
      if (password !== passwordConfirm) {
        return toast.error("Passwords are not the same!", { autoClose: 3000 });
      }
      const response = await register({
        name,
        email,
        password,
        passwordConfirm,
      }).unwrap();
      dispatch(showUsersInfo({ ...response }));
      navigate(redirect);

      toast.success("Register successfully!", {
        autoClose: 3000,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.data.message || err.error, { autoClose: 3000 });
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="fullname"
            name="name"
            value={inputValues.name}
            onChange={onChangeHandler}
            required
          />
        </Form.Group>
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
            autoComplete="email-adress"
            name="password"
            value={inputValues.password}
            onChange={onChangeHandler}
            minLength={8}
            required
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="••••••••"
            autoComplete="email-adress"
            name="passwordConfirm"
            value={inputValues.passwordConfirm}
            onChange={onChangeHandler}
            minLength={8}
            required
          />
        </Form.Group>
        <Button
          type="submit"
          variant="outline-dark"
          className="mt-2"
          disabled={isLoading}
        >
          {isLoading ? <Loader width={30} height={30} /> : "Sign Up"}
        </Button>
      </Form>
    </FormContainer>
  );
};
