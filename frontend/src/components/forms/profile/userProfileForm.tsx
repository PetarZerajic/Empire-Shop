import { ChangeEvent, FormEvent, RefObject } from "react";
import { Button, Form } from "react-bootstrap";
import { BsUpload } from "react-icons/bs";
import { IUserProfile } from "../../../interfaces/IUsers";
import { Loader } from "../../loader/loader";

interface IProps {
  submitHandler(event: FormEvent): void;
  imgRef: RefObject<HTMLImageElement>;
  inputValues: IUserProfile;
  loadingUpdateProfile: boolean;
  loadingUpdatePassword: boolean;
  handleChangeImage(event: ChangeEvent<HTMLInputElement>): void;
  onChangeHandler(event: ChangeEvent<HTMLInputElement>): void;
}

export const UserProfileForm = (props: IProps) => {
  const {
    submitHandler,
    imgRef,
    inputValues,
    handleChangeImage,
    onChangeHandler,
    loadingUpdateProfile,
    loadingUpdatePassword,
  } = props;
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="d-flex justify-content-center align-items-center gap-4">
        <img
          id="custom-profile-img"
          ref={imgRef}
          src={`/images/users/${inputValues.photo}`}
          alt={inputValues.name}
        />
        <Form.Label htmlFor="file" id="file-label">
          <BsUpload />
        </Form.Label>
        <Form.Control type="file" id="file" onChange={handleChangeImage} />
      </Form.Group>
      <Form.Group className="my-2">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={inputValues.name}
          onChange={onChangeHandler}
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group className="my-2">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={inputValues.email}
          onChange={onChangeHandler}
          autoComplete="off"
        />
      </Form.Group>

      <Form.Group className="my-2">
        <Form.Label>Current Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter new password"
          name="passwordCurrent"
          value={inputValues.passwordCurrent}
          onChange={onChangeHandler}
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group className="my-2">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          value={inputValues.password}
          onChange={onChangeHandler}
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group className="my-2">
        <Form.Label>Password Confirm</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm password"
          name="passwordConfirm"
          value={inputValues.passwordConfirm}
          onChange={onChangeHandler}
          autoComplete="off"
        />
      </Form.Group>

      <Button type="submit" id="custom-btn" className="mt-3">
        {loadingUpdateProfile || loadingUpdatePassword ? (
          <Loader width={30} height={30} />
        ) : (
          "Update"
        )}
      </Button>
    </Form>
  );
};
