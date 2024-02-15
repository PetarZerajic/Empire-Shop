import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../../redux/slices/productsApiSlice";
import { ProductCard } from "../../components/card/productCard";
import { IProducts } from "../../interfaces/IProducts";
import { Loader } from "../../components/loader/loader";
import { Message } from "../../components/message/message";
export const Home = () => {
  const {
    data: products,
    isLoading,
    error,
    isSuccess,
  } = useGetProductsQuery("Product");

  let errMessage = "";
  if (error) {
    if ("status" in error) {
      errMessage = "data" in error ? JSON.stringify(error.data) : error.error;
    }
  }
  return (
    <>
      {isLoading && <Loader width={100} height={100} />}
      {error && <Message variant="danger">{errMessage}</Message>}

      <h1 style={{ color: "grey" }}>Latest Products</h1>
      <Row>
        {isSuccess &&
          products.data.map((product: IProducts) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <ProductCard product={product} />
            </Col>
          ))}
      </Row>
    </>
  );
};
