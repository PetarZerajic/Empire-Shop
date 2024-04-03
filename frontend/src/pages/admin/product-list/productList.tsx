import { Button, Col, Row } from "react-bootstrap";
import { Loader } from "../../../components/loader/loader";
import { useCreateProductMutation,useDeleteOneProdcutMutation,useGetProductsQuery,useUpdateProductMutation,useUploadProductImageMutation} from "../../../redux/slices/productsApiSlice";
import { MakeErrorMessage } from "../../../utils/makeErrorMessage";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { ChangeEvent, useState } from "react";
import { IProducts } from "../../../interfaces/IProducts";
import { useParams } from "react-router-dom";
import { Message } from "../../../components/message/message";
import { Meta } from "../../../components/meta/meta";
import { ProductModal } from "../../../components/modals/product/productModal";
import { ProductTable } from "../../../components/tables/product/productTable";

export const ProductList = () => {
  const { pageNumber } = useParams();
  const {data: products, isLoading, isSuccess, error, refetch} = useGetProductsQuery({ pageNumber });
  const [createProduct, { isLoading: createLoading }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteOneProdcutMutation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const { errMessage } = MakeErrorMessage({ error });

  const defaultValues = {
    _id: "",
    name: "",
    price: 0,
    imageCover: "",
    category: "",
    brand: "",
    description: "",
    countInStock: 0,
  };
  const [inputValues, setInputValues] = useState<IProducts>(defaultValues);
  const [show, setShow] = useState(false);

  const handleCloseForm = () => setShow(false);
  const handleOpenForm = (product: IProducts | null) => {
    setShow(true);
    setInputValues(product ? { ...product } : defaultValues);
  };
  const handleCreateProduct = async () => {
    try {
      await createProduct({...inputValues}).unwrap();
      refetch();
      setShow(false);
      toast.success("Successfully created");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.data.message || err.error);
    }
  };

  const handleEditProduct = async (id: string) => {
    try {
      await updateProduct({id, data: {...inputValues}}).unwrap();
      refetch();
      setShow(false);
      toast.success("Successfully updated");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.data.message || err.error);
    }
  };

  const deleteItemHandler = async (id: string) => {
    if (confirm("Are you sure ?")) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success("Successfully deleted");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(err.data.message || err.error);
      }
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    try {
      const formData = new FormData();
      formData.append("image", files![0]);

      const response = await uploadProductImage(formData).unwrap();
      setInputValues({ ...inputValues, imageCover: response.image });
    } catch (err) {
      console.log(err);
    }
  };
    return (
      <>
      <Meta title="Products"/>
        <Row >
          <Col>
            <h1>Products</h1>
          </Col>
          <Col className="text-end">
            <Button className="btn-sm m-3" onClick={() => handleOpenForm(null)}>
              <span className="d-flex  align-items-center gap-1">
                <FaEdit />
                Create Product
              </span>
            </Button>
            <ProductModal
              show={show}
              inputValues={inputValues}
              handleCloseForm={handleCloseForm}
              handleChange={handleChange}
              handleChangeImage={handleChangeImage}
              handleCreateProduct={handleCreateProduct}
              handleEditProduct={handleEditProduct}
              isloading={createLoading || updateLoading}
            />
          </Col>
        </Row>
        {isLoading || loadingDelete && <Loader width={100} height={100} />}
        {error && <Message variant="danger">{errMessage}</Message>}
        {isSuccess && (
        <ProductTable products={products} handleOpenForm={handleOpenForm} deleteItemHandler={deleteItemHandler}/>
          )}
        </> 
        )}