import { Row, Col } from "react-bootstrap";
import { Product } from "../../components/Product/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import { IProducts } from "../../interfaces/IProducts";

export const HomeScreen = () => {
  const [products, setProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data.data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <h1 style={{ color: "grey" }}>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};
