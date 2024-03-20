import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { Message } from "../message/message";
import { useGetTopProductsQuery } from "../../redux/slices/productsApiSlice";
import { MakeErrorMessage } from "../../utils/makeErrorMessage";
import "./carousel.css";

export const CarouselProduct = () => {
  const { data: products, isSuccess, error } = useGetTopProductsQuery();
  const { errMessage } = MakeErrorMessage({ error });
  return (
    <>
      {error && <Message variant="danger"> {errMessage}</Message>}
      {isSuccess && (
        <Carousel pause="hover">
          {products.data.map((item) => (
            <Carousel.Item key={item._id}>
              <Link to={`/product/${item._id}`}>
                <Image
                  src={`/images/products/${item.imageCover}`}
                  alt={item.name}
                  fluid
                />
              </Link>
              <Carousel.Caption>
                <h2>
                  {item.name} (${item.price})
                </h2>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};
