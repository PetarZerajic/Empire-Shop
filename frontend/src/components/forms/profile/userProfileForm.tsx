import { ChangeEvent, FormEvent, RefObject } from "react";
import { Button, Form } from "react-bootstrap";
import { BsUpload } from "react-icons/bs";
import { IUserProfile } from "../../../interfaces/IUsers";
import { Loader } from "../../loader/loader";

interface IProps {
  onSubmitHandler(event: FormEvent): void;
  imgRef: RefObject<HTMLImageElement>;
  inputValues: IUserProfile;
  loadingProfile: boolean;
  loadingPassword: boolean;
  handleChangeImage(event: ChangeEvent<HTMLInputElement>): void;
  onChangeHandler(event: ChangeEvent<HTMLInputElement>): void;
}

export const UserProfileForm = (props: IProps) => {
  const isLoading = props.loadingProfile || props.loadingPassword;
  return (
    <Form onSubmit={props.onSubmitHandler}>
      <Form.Group className="d-flex justify-content-center align-items-center gap-4">
        <img
          id="custom-profile-img"
          ref={props.imgRef}
          src={`/images/users/${props.inputValues.photo}`}
          alt={props.inputValues.name}
        />
        <Form.Label htmlFor="file" id="file-label">
          <BsUpload />
        </Form.Label>
        <Form.Control
          type="file"
          id="file"
          onChange={props.handleChangeImage}
        />
      </Form.Group>
      <Form.Group className="my-2">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={props.inputValues.name}
          onChange={props.onChangeHandler}
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group className="my-2">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={props.inputValues.email}
          onChange={props.onChangeHandler}
          autoComplete="off"
        />
      </Form.Group>

      <Form.Group className="my-2">
        <Form.Label>Current Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter new password"
          name="passwordCurrent"
          value={props.inputValues.passwordCurrent}
          onChange={props.onChangeHandler}
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group className="my-2">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          value={props.inputValues.password}
          onChange={props.onChangeHandler}
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group className="my-2">
        <Form.Label>Password Confirm</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm password"
          name="passwordConfirm"
          value={props.inputValues.passwordConfirm}
          onChange={props.onChangeHandler}
          autoComplete="off"
        />
      </Form.Group>

      <Button type="submit" id="custom-btn" className="mt-3">
        {isLoading ? <Loader width={30} height={30} /> : "Update"}
      </Button>
    </Form>
  );
};
