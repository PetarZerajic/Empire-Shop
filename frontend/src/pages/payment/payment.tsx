import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { FormContainer } from "../../components/container/formContainer";
import { Checkout } from "../../components/checkout/checkout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";
import { savePaymentMehod } from "../../redux/slices/cartSlice";
import { Routes } from "../../router/routes";

export const Payment = () => {
  const { shippingAddress } = useSelector(
    (state: RootState) => state.reducer.cart
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.values(shippingAddress).every((field) => field === "")) {
      navigate(Routes.HOME);
    }
  }, [shippingAddress, navigate]);

  const [paymentMethod, setPaymentMethod] = useState("Card");

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(savePaymentMehod(paymentMethod));
    navigate(Routes.Placeorder);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };
  return (
    <FormContainer>
      <Checkout step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              id="paypal"
              type="radio"
              className="my-2"
              label="Paypal or Credit Card"
              value="Card"
              onChange={onChangeHandler}
            />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Contiune
        </Button>
      </Form>
    </FormContainer>
  );
};
