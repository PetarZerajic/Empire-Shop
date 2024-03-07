import { ChangeEvent } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { IProducts } from "../../interfaces/IProducts";

interface IProps {
  show: boolean;
  inputValues: IProducts;
  handleCloseForm(): void;
  handleChange(event: ChangeEvent): void;
  handleChangeImage(event: ChangeEvent): void;
  handleCreateProduct(): void;
  handleEditProduct(id: string): void;
}
export const ModalContainer = (props: IProps) => {
  const {
    show,
    inputValues,
    handleCloseForm,
    handleChange,
    handleChangeImage,
    handleCreateProduct,
    handleEditProduct,
  } = props;
  return (
    <Modal show={show} onHide={handleCloseForm} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="my-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={inputValues.name}
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
            value={inputValues.price}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label>Image</Form.Label>
          {inputValues.imageCover ? (
            <>
              <Form.Control
                className="mb-3"
                type="text"
                name="imageCover"
                value={inputValues.imageCover}
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
            value={inputValues.category}
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
            value={inputValues.brand}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            name="description"
            value={inputValues.description}
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
            value={inputValues.countInStock}
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

        {inputValues._id ? (
          <Button
            variant="primary"
            onClick={() => handleEditProduct(inputValues._id)}
          >
            Save changes
          </Button>
        ) : (
          <Button variant="primary" onClick={handleCreateProduct}>
            Create
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
