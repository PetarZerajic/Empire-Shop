import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IProducts } from "../../interfaces/IProducts";
import { Rating } from "../rating/rating";
import "./productCard.css";

export const ProductCard = (props: { product: IProducts }) => {
  const { product } = props;

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={`/images/products/${product.imageCover}`}
          variant="top"
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating!}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};
