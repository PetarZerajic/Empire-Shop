import { useEffect, useState } from "react";
import { Row, Col, Card, Button, Image, ListGroup } from "react-bootstrap";
import { Rating } from "../../components/Rating/Rating";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Routes } from "../../Router/Routes";
import { IProducts } from "../../interfaces/IProducts";
import axios from "axios";
import "./productScreen.css";

export const ProductScreen = () => {
  const { id } = useParams();
  const [product, setPorduct] = useState<IProducts>();
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`/api/product/${id}`);
      setPorduct(response.data.data);
    };
    fetchProduct();
  }, []);

  if (product)
    return (
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
