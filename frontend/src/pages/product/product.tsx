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
import {
  useCreateProductReviewMutation,
  useGetOneProductQuery,
} from "../../redux/slices/productsApiSlice";
import { ChangeEvent, FormEvent, useState } from "react";
import { addTocart } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../../components/message/message";
import { MakeErrorMessage } from "../../utils/makeErrorMessage";
import "./product.css";
import { RootState } from "../../redux/store/store";
import { toast } from "react-toastify";

export const Product = () => {
  const { id } = useParams();
  const {
    data: product,
    isSuccess,
    refetch,
    error,
  } = useGetOneProductQuery(id);
  const [createReview, { isLoading }] = useCreateProductReviewMutation();

  const [inputValues, setInputValues] = useState({
    quantity: 1,
    rating: 0,
    comment: "",
  });

  const { userInfo } = useSelector((state: RootState) => state.reducer.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    const updatedProduct = {
      ...product?.data,
      quantity: inputValues.quantity,
    };
    dispatch(addTocart(updatedProduct));
    navigate("/cart");
  };

  const handleChangeRating = (value: number) => {
    setInputValues((prevState) => ({
      ...prevState,
      rating: value,
    }));
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await createReview({
        id,
        data: {
          ...inputValues,
        },
      }).unwrap();
      refetch();
      toast.success("Review submitted");
      setInputValues({ ...inputValues, rating: 0, comment: "" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.data.message || err.data.error);
    }
  };
  const isReviewAdded = product?.data.reviews?.find(
    (i) => i.user === userInfo?.data.user._id
  );
  const { errMessage } = MakeErrorMessage({ error });

  return (
    <>
      {error && <Message variant="danger">{errMessage}</Message>}
      {isSuccess && (
        <>
          <Link to={Routes.Home} className="btn btn-light my-3">
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
                            name="quantity"
                            value={inputValues.quantity}
                            onChange={handleChange}
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
          <Row className="review">
            <Col md={6}>
              <h2>{isReviewAdded ? "Reviews" : "Create Review"}</h2>
              {userInfo ? (
                <div className="mt-4">
                  {!isReviewAdded ? (
                    <Form onSubmit={handleOnSubmit}>
                      <Form.Group controlId="rating" className="my-2">
                        <Form.Label>Rating</Form.Label>
                        <Rating
                          value={inputValues.rating}
                          handleChangeRating={handleChangeRating}
                        />
                      </Form.Group>
                      <Form.Group className="my-2">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="comment"
                          value={inputValues.comment}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Button disabled={isLoading} type="submit">
                        Submit
                      </Button>
                    </Form>
                  ) : null}
                </div>
              ) : (
                <Message>
                  Please <Link to={Routes.Login}>log in</Link> to write a review
                </Message>
              )}
              <ListGroup.Item className="mt-5" variant="flush">
                {product.data.reviews?.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt?.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup.Item>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
