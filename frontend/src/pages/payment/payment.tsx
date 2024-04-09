import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form,FormCheck, Col, Button } from "react-bootstrap";
import { FormContainer } from "../../components/container/formContainer";
import { CheckoutSteps } from "../../components/checkout-steps/checkoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../../redux/slices/cartSlice";
import { Routes } from "../../router/routes";
import { emptyShippingFields } from "../../utils/emptyShippingFields";

export const Payment = () => {
  const { shippingAddress } = useSelector(
    (state: RootState) => state.reducer.cart
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (emptyShippingFields(shippingAddress)) {
      navigate(Routes.Shipping);
    }
  }, [shippingAddress, navigate]);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [checked, setChecked] = useState(false);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate(Routes.Placeorder);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPaymentMethod(value)
    setChecked(true);
  };

  const styles = {cursor: "pointer"}

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={onSubmitHandler} className="mt-3">
        <Form.Group >
          <Form.Label className="mb-4" as="legend">Select Method</Form.Label>
          <Col >
          <FormCheck>
            <FormCheck.Input 
              id="paypal"
              style={styles}
              type="radio"
              value="PayPal"
              checked={paymentMethod === "PayPal"}  
              onChange={onChangeHandler}/>
            <FormCheck.Label htmlFor="paypal" style={styles}> PayPal</FormCheck.Label>
          </FormCheck>

          <FormCheck className="mt-3">
            <FormCheck.Input 
              id="credict-card"
              style={styles}
              type="radio"
              value="Credit Card"
              checked={paymentMethod === "Credit Card"}  
              onChange={onChangeHandler}/>
              <FormCheck.Label htmlFor="credict-card" style={styles}> Credit Card</FormCheck.Label>
          </FormCheck>
          </Col>
        </Form.Group>

        <Button
          className="mt-4"
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
