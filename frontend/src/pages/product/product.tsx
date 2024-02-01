import { Row, Col, Card, Button, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Rating } from "../../components/rating/rating";
import { Routes } from "../../router/routes";
import { useGetOneProductQuery } from "../../redux/slices/productsApiSlice";
import "./product.css";

export const Product = () => {
  const { id } = useParams();
  const { data, isError } = useGetOneProductQuery(id);

  const product = data?.data;
  if (product)
    return (
      <>
        <Link to={Routes.HOME} className="btn btn-light my-3">
          Go back
        </Link>
        {isError && <h2>Something has gone wrong</h2>}
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
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    );
};
