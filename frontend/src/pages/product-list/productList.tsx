import { Button, Col, OverlayTrigger, Row, Table } from "react-bootstrap";
import { Loader } from "../../components/loader/loader";
import {
  useCreateProductMutation,
  useDeleteOneProdcutMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/slices/productsApiSlice";
import { MakeErrorMessage } from "../../utils/makeErrorMessage";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { ChangeEvent, useState } from "react";
import { ModalContainer } from "../../components/container/modalContainer";
import { IProducts } from "../../interfaces/IProducts";
import Tooltip from "react-bootstrap/Tooltip";

export const ProductList = () => {
  const {
    data: products,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useGetProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteOneProdcutMutation();
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
      await createProduct({
        ...inputValues,
      }).unwrap();

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
      await updateProduct({
        id,
        data: {
          ...inputValues,
        },
      }).unwrap();
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
      <Row className="align-items-center">
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
          <ModalContainer
            show={show}
            inputValues={inputValues}
            handleCloseForm={handleCloseForm}
            handleChange={handleChange}
            handleChangeImage={handleChangeImage}
            handleCreateProduct={handleCreateProduct}
            handleEditProduct={handleEditProduct}
          />
        </Col>
      </Row>
      {isLoading && <Loader width={100} height={100} />}
      {loadingDelete && <Loader width={100} height={100} />}

      {error && errMessage}
      {isSuccess && (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {products.data.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.category}</td>
                <td>{item.brand}</td>
                <td>
                  <OverlayTrigger
                    overlay={<Tooltip id="tooltip-top">Edit</Tooltip>}
                  >
                    <Button
                      variant="light"
                      className="btn-sm mx-2"
                      onClick={() => handleOpenForm(item)}
                    >
                      <FaEdit />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    overlay={<Tooltip id="tooltip-top">Delete</Tooltip>}
                  >
                    <Button
                      variant="light"
                      className="btn-sm mx-2"
                      onClick={() => deleteItemHandler(item._id)}
                    >
                      <FaTrash style={{ color: "maroon" }} />
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
