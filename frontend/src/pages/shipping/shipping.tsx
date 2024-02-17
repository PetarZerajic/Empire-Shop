import { ChangeEvent, FormEvent, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FormContainer } from "../../components/container/formContainer";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store/store";

export const Shipping = () => {
  const { shippingAddress } = useSelector(
    (state: RootState) => state.reducer.cart
  );
  const { address, city, postalCode, country } = shippingAddress;

  const [inputValues, setInputValues] = useState({
    address: address || "",
    city: city || "",
    postalCode: postalCode || "",
    country: country || "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(saveShippingAddress({ ...inputValues }));
    navigate("/payment");
  };
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            name="address"
            value={inputValues.address}
            onChange={onChangeHandler}
            required
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your city"
            name="city"
            value={inputValues.city}
            onChange={onChangeHandler}
            required
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter  city"
            name="postalCode"
            value={inputValues.postalCode}
            onChange={onChangeHandler}
            required
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            name="country"
            value={inputValues.country}
            onChange={onChangeHandler}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};
