import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Routes } from "../../router/routes";

interface ICheckout {
  step1: boolean;
  step2: boolean;
  step3?: boolean;
  step4?: boolean;
}
export const CheckoutSteps = ({ step1, step2, step3, step4 }: ICheckout) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to={Routes.Login}>
            <Nav.Link>Log in</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Log in</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to={Routes.Shipping}>
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to={Routes.Payment}>
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to={Routes.Placeorder}>
            <Nav.Link>Placeorder</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Placeorder</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};
