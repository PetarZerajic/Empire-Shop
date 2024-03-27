import { Row, Col, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
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
import { RootState } from "../../redux/store/store";
import { toast } from "react-toastify";
import { Meta } from "../../components/meta/meta";
import { ProductSummaryCenter, ProductSummaryRight } from "./productSummary";
import { ProductReview } from "./productReview";
import "./product.css";

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
    navigate(Routes.Cart);
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
        <div>
          <Meta title={product.data.name} />
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
              <ProductSummaryCenter product={product} />
            </Col>
            <Col md={3}>
              <ProductSummaryRight
                product={product}
                inputValues={inputValues}
                handleChange={handleChange}
                addToCartHandler={addToCartHandler}
              />
            </Col>
          </Row>
          <Row className="review">
            <Col md={6} className="mt-4">
              <ProductReview
                isReviewAdded={isReviewAdded}
                userInfo={userInfo}
                inputValues={inputValues}
                isLoading={isLoading}
                product={product}
                handleOnSubmit={handleOnSubmit}
                handleChangeRating={handleChangeRating}
                handleChange={handleChange}
              />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
