import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../../redux/slices/productsApiSlice";
import { ProductCard } from "../../components/card/productCard";
import { IProducts } from "../../interfaces/IProducts";

export const Home = () => {
  const {
    data: products,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductsQuery("Product");
  return (
    <>
      {isLoading && <h2>...Loading</h2>}
      {isError && <h2>Something has gone wrong</h2>}

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
