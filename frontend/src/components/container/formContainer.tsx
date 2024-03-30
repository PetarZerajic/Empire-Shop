import { ReactNode } from "react";
import { Container, Row, Col } from "react-bootstrap";

export const FormContainer = ({children}:{children:ReactNode}) => {
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
