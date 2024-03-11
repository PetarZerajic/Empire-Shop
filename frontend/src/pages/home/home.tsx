import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../../redux/slices/productsApiSlice";
import { ProductCard } from "../../components/card/productCard";
import { IProducts } from "../../interfaces/IProducts";
import { Loader } from "../../components/loader/loader";
import { Message } from "../../components/message/message";
import { MakeErrorMessage } from "../../utils/makeErrorMessage";
import { useParams } from "react-router-dom";
import { Paginate } from "../../components/paginate/paginate";
export const Home = () => {
  const { pageNumber } = useParams();
  const {
    data: products,
    isLoading,
    isSuccess,
    error,
  } = useGetProductsQuery(pageNumber);
  const { errMessage } = MakeErrorMessage({ error });

  return (
    <>
      {isLoading && <Loader width={100} height={100} />}
      {error && <Message variant="danger">{errMessage}</Message>}
      {isSuccess && (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.data.map((product: IProducts) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={products.pages} page={products.page} />
        </>
      )}
    </>
  );
};
