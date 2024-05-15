import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { setUserInfo } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import {
  useProfileMutation,
  useUpdatePasswordMutation,
  useUploadUserPhotoMutation,
} from "../../redux/slices/userApiSlice";
import { useGetMyOrdersQuery } from "../../redux/slices/orderApiSlice";
import { MakeErrorMessage } from "../../utils/makeErrorMessage";
import { IUserProfile } from "../../interfaces/IUsers";
import { UserProfileForm } from "../../components/forms/profile/userProfileForm";
import { MyOrderTable } from "../../components/tables/order/myOrderTable";
import "./profile.css";

export const Profile = () => {
  const { userInfo } = useSelector((state: RootState) => state.reducer.auth);
  const { name, email, photo } = userInfo!.data.user;

  const [inputValues, setInputValues] = useState<IUserProfile>({
    name: name,
    email: email,
    photo: photo,
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });
  const imgRef = useRef<HTMLImageElement>(null);
  const [updateProfile, { isLoading: loadingProfile }] = useProfileMutation();

  const [updatePassword, { isLoading: loadingPassword }] =
    useUpdatePasswordMutation();

  const [uploadProductImage] = useUploadUserPhotoMutation();
  const { data: orders, error } = useGetMyOrdersQuery();

  const dispatch = useDispatch();
  const handleUpdatePassword = async (isPasswordValid: boolean) => {
    try {
      if (isPasswordValid) {
        const { password, passwordConfirm, passwordCurrent } = inputValues;
        const response = await updatePassword({
          password,
          passwordConfirm,
          passwordCurrent,
        }).unwrap();
        dispatch(setUserInfo(response));
        toast.success("Password updated successfully!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };
  const handleUpdateProfile = async () => {
    try {
      const { name, email, photo } = inputValues;
      const response = await updateProfile({
        name,
        email,
        photo,
      }).unwrap();

      dispatch(setUserInfo(response));
      toast.success("Profile updated successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { password, passwordConfirm } = inputValues;
      const passwordDoNotMatch = password !== passwordConfirm;
      if (passwordDoNotMatch) {
        return toast.error("Password do not match!");
      }

      const isPasswordValid = passwordConfirm ? true : false;
      if (isPasswordValid) handleUpdatePassword(isPasswordValid);
      else handleUpdateProfile();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      toast.error(err.data.message || err.error);
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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
      setInputValues({ ...inputValues, photo: response.image });
    } catch (err) {
      console.log(err);
    }
  };

  const { errMessage } = MakeErrorMessage({ error });
  const props = {
    inputValues,
    imgRef,
    loadingProfile,
    loadingPassword,
    handleChangeImage,
    onChangeHandler,
    onSubmitHandler,
  };
  return (
    <Row>
      <Col md={3}>
        <UserProfileForm {...props} />
      </Col>
      <Col md={9}>
        <MyOrderTable error={error} errMessage={errMessage} orders={orders} />
      </Col>
    </Row>
  );
};
