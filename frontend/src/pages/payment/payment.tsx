import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { FormContainer } from "../../components/container/formContainer";
import { CheckoutSteps } from "../../components/checkout-steps/checkoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../../redux/slices/cartSlice";
import { Routes } from "../../router/routes";
import { emptyShippingFields } from "../../utils/emptyShippingFields";

export const Payment = () => {
  const { shippingAddress, paymentMethod } = useSelector(
    (state: RootState) => state.reducer.cart
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (emptyShippingFields(shippingAddress)) {
      navigate(Routes.Shipping);
    }
  }, [shippingAddress, navigate]);

  const [checked, setChecked] = useState(false);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate(Routes.Placeorder);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(savePaymentMethod(value));
    setChecked(true);
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={onSubmitHandler} className="mt-3">
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              id="paypal"
              type="radio"
              className="my-2"
              label="Paypal or Credit Card"
              value={paymentMethod}
              onChange={onChangeHandler}
            />
          </Col>
        </Form.Group>
        <Button
          className="mt-2"
          type="submit"
          variant={checked ? "primary" : "secondary"}
          disabled={!checked}
        >
          Contiune
        </Button>
      </Form>
    </FormContainer>
  );
};
