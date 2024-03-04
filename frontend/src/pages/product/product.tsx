import {
  Row,
  Col,
  Card,
  Button,
  Image,
  ListGroup,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Rating } from "../../components/rating/rating";
import { Routes } from "../../router/routes";
import { useGetOneProductQuery } from "../../redux/slices/productsApiSlice";
import "./product.css";
import { useState } from "react";
import { addTocart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { Message } from "../../components/message/message";
import { MakeErrorMessage } from "../../utils/makeErrorMessage";

export const Product = () => {
  const { id } = useParams();
  const { data, isSuccess, error } = useGetOneProductQuery(id);
  const [quantity, setQuantity] = useState<number>(1);
  const product = data?.data;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    const updatedProduct = {
      ...product,
      quantity: quantity,
    };
    dispatch(addTocart(updatedProduct));
    navigate("/cart");
  };
  const { errMessage } = MakeErrorMessage({ error });
  return (
    <>
      {error && <Message variant="danger">{errMessage}</Message>}
      {isSuccess && (
        <>
          <Link to={Routes.HOME} className="btn btn-light my-3">
            Go back
          </Link>
          <Row>
            <Col md={5}>
              <Image
                src={`/images/products/${product.imageCover}`}
                alt={product.name}
                fluid
              />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item style={{ fontWeight: "bold" }}>
                  Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(event) =>
                              setQuantity(+event.target.value)
                            }
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (value) => (
                                <option key={value + 1} value={value + 1}>
                                  {value + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item className="m-auto">
                    <Button
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={() => addToCartHandler()}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
