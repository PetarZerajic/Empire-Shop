import { ReactNode } from "react";
import { Container, Row, Col } from "react-bootstrap";

export const FormContainer = (props: { children: ReactNode }) => {
  const { children } = props;
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};
