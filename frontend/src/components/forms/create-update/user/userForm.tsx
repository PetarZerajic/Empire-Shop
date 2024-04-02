import { ChangeEvent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IUsers } from "../../../../interfaces/IUsers";
import { Loader } from "../../../loader/loader";
import "./userForm.css"

interface IProps {
    inputValues: IUsers;
    isloading: boolean;
    handleChange(event: ChangeEvent): void;
    handleChangeImage(event: ChangeEvent): void;
    handleCloseForm(): void;
    handleEditUser(id: string): void;
  }
export const UserForm = (props:IProps) => {
  const {inputValues, isloading, handleChange, handleChangeImage, handleCloseForm, handleEditUser} = props;

  return (
    <>
    <Modal.Header closeButton>
      <Modal.Title>User</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group>
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
        <Form.Label>email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={inputValues.email}
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </Form.Group>

      <Form.Group className="my-2">
        <Form.Label>Image</Form.Label>
        {inputValues.photo ? (
          <>
            <Form.Control
              className="mb-3"
              type="text"
              name="photo"
              value={inputValues.photo}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <Form.Control
              type="file"
              onChange={handleChangeImage}
              autoComplete="off"
              required
            />
          </>
        ) : (
          <Form.Control
            type="file"
            onChange={handleChangeImage}
            autoComplete="off"
            required
          />
        )}
      </Form.Group>

      <Form.Group className="my-2">
        <Form.Label>Role</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter role"
          name="role"
          value={inputValues.role}
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

      <Button
        className="custom-btn"
        variant="primary"
        disabled={isloading}
        onClick={() => handleEditUser(inputValues._id)}
      >
        {isloading ? <Loader width={25} height={25} /> : "Save changes"}
      </Button>
    </Modal.Footer>
  </>
  )
}
