import { ChangeEvent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IProducts } from "../../../../interfaces/IProducts";
import { Loader } from "../../../loader/loader";
import "./productForm.css"

interface IProps {
    productValues: IProducts;
    isloading: boolean;
    handleChange(event: ChangeEvent): void;
    handleChangeImage(event: ChangeEvent): void;
    handleCloseForm(): void;
    handleCreateProduct(): void;
    handleEditProduct(id: string): void;
  }
export const ProductForm = (props: IProps) => {
  const {productValues, isloading, handleChange, handleChangeImage, handleCloseForm, handleCreateProduct, handleEditProduct,} = props;

  return (
    <>
    <Modal.Header closeButton>
      <Modal.Title>Product</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={productValues.name}
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </Form.Group>
      <Form.Group className="my-2">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter price"
          name="price"
          value={productValues.price}
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </Form.Group>

      <Form.Group className="my-2">
        <Form.Label>Image</Form.Label>
        {productValues.imageCover ? (
          <>
            <Form.Control
              className="mb-3"
              type="text"
              name="imageCover"
              value={productValues.imageCover}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <Form.Control
              type="file"
              name="image"
              onChange={handleChangeImage}
              autoComplete="off"
              required
            />
          </>
        ) : (
          <Form.Control
            type="file"
            name="image"
            onChange={handleChangeImage}
            autoComplete="off"
            required
          />
        )}
      </Form.Group>

      <Form.Group className="my-2">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter category"
          name="category"
          value={productValues.category}
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </Form.Group>

      <Form.Group className="my-2">
        <Form.Label>Brand</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter brand"
          name="brand"
          value={productValues.brand}
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </Form.Group>

      <Form.Group className="my-2">
        <Form.Label>Description</Form.Label>
        <Form.Control
          className="text-truncate"
          type="text"
          placeholder="Enter description"
          name="description"
          value={productValues.description}
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Count in Stock</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter count in stock"
          name="countInStock"
          value={productValues.countInStock}
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseForm}>
        Close
      </Button>

      {productValues._id ? (
        <Button
          className="custom-btn"
          variant="primary"
          onClick={() => handleEditProduct(productValues._id)}
        >
          {isloading ? <Loader width={30} height={30} /> : "Save changes"}
        </Button>
      ) : (
        <Button
          className="custom-btn"
          variant="primary"
          onClick={handleCreateProduct}
        >
          {isloading ? <Loader width={30} height={30} /> : "Create"}
        </Button>
      )}
    </Modal.Footer>
  </>
  )
}
