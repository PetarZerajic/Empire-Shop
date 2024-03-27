import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { IProducts } from "../../interfaces/IProducts";
import { Rating } from "../../components/rating/rating";
import { ChangeEvent } from "react";

interface IProps {
  product: { data: IProducts };
  inputValues?: {quantity: number};
  handleChange?(event: ChangeEvent<HTMLInputElement>): void;
  addToCartHandler?(): void;
}

export const ProductSummaryCenter = ({ product }: IProps) => {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <h3>{product.data.name}</h3>
      </ListGroup.Item>
      <ListGroup.Item>
        <Rating
          value={product.data.rating!}
          text={`${product.data.numReviews} reviews`}
        />
      </ListGroup.Item>
      <ListGroup.Item style={{ fontWeight: "bold" }}>
        Price: ${product.data.price}
      </ListGroup.Item>
      <ListGroup.Item>Description: {product.data.description}</ListGroup.Item>
    </ListGroup>
  );
};

export const ProductSummaryRight = ({product,inputValues,handleChange, addToCartHandler}: IProps) => {
  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <Col>Price:</Col>
            <Col>
              <strong>${product.data.price}</strong>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Status:</Col>
            <Col>
              <strong>
                {product.data.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </strong>
            </Col>
          </Row>
        </ListGroup.Item>
        {product.data.countInStock > 0 && (
          <ListGroup.Item>
            <Row>
              <Col>Quantity</Col>
              <Col>
                <Form.Control
                  as="select"
                  name="quantity"
                  value={inputValues?.quantity}
                  onChange={handleChange}
                >
                  {[...Array(product.data.countInStock).keys()].map((value) => (
                    <option key={value + 1} value={value + 1}>
                      {value + 1}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </ListGroup.Item>
        )}
        <ListGroup.Item className="m-auto">
          <Button
            id="custom-btn"
            type="button"
            disabled={product.data.countInStock === 0}
            onClick={() => addToCartHandler!()}
          >
            Add To Cart
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};
