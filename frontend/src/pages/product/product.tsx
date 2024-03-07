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
import { useState } from "react";
import { addTocart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { Message } from "../../components/message/message";
import { MakeErrorMessage } from "../../utils/makeErrorMessage";
import "./product.css";

export const Product = () => {
  const { id } = useParams();
  const { data: product, isSuccess, error } = useGetOneProductQuery(id);
  const [quantity, setQuantity] = useState<number>(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    const updatedProduct = {
      ...product?.data,
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
                src={`/images/products/${product.data.imageCover}`}
                alt={product.data.name}
                fluid
              />
            </Col>
            <Col md={4}>
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
                <ListGroup.Item>
                  Description: {product.data.description}
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
                        <strong>${product.data.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.data.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
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
                            value={quantity}
                            onChange={(event) =>
                              setQuantity(+event.target.value)
                            }
                          >
                            {[...Array(product.data.countInStock).keys()].map(
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
                      disabled={product.data.countInStock === 0}
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
