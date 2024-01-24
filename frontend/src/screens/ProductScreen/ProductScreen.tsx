import { Row, Col, Card, Button, Image, ListGroup } from "react-bootstrap";
import { Rating } from "../../components/Rating/Rating";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { products } from "../../product";
import { Routes } from "../../Router/Routes";
import "./productScreen.css";

export const ProductScreen = () => {
  const { id } = useParams();
  const numId = +id!;
  const proudct = products.find((i) => i._id === numId);
  return (
    <>
      <Link to={Routes.HOME} className="btn btn-light my-3">
        Go back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={proudct?.image} alt={proudct?.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{proudct?.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={proudct!.rating}
                text={`${proudct?.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item style={{ fontWeight: "bold" }}>
              Price: ${proudct?.price}
            </ListGroup.Item>
            <ListGroup.Item>Description: {proudct?.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${proudct?.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {proudct!.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={proudct?.countInStock === 0}
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
