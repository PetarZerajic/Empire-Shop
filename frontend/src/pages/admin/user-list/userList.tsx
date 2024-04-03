import { Col,Row,} from "react-bootstrap";
import {useDeleteUserMutation,useGetUsersQuery,useUpdateUserMutation,useUploadUserPhotoMutation} from "../../../redux/slices/userApiSlice";
import { MakeErrorMessage } from "../../../utils/makeErrorMessage";
import { Loader } from "../../../components/loader/loader";
import { IUsers } from "../../../interfaces/IUsers";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { Meta } from "../../../components/meta/meta";
import { UserModal } from "../../../components/modals/user/userModal";
import { Message } from "../../../components/message/message";
import { UserTable } from "../../../components/tables/user/userTable";
import "./userList.css";

export const UserList = () => {
  const {data: users, isSuccess, isLoading, refetch, error} = useGetUsersQuery();
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
  const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();
  const [uploadUserImage] = useUploadUserPhotoMutation();
  const { errMessage } = MakeErrorMessage({ error });

  const defaultValues = {
    _id: "",
    photo: "",
    name: "",
    email: "",
    role: "",
  };
  const [inputValues, setInputValues] = useState<IUsers>(defaultValues);

  const [show, setShow] = useState(false);

  const handleOpenForm = (user: IUsers) => {
    setShow(true);
    setInputValues(user ? user : defaultValues);
  };

  const deleteItemHandler = async (id: string) => {
    try {
      if (confirm("Are you sure ?")) {
        await deleteUser(id).unwrap();
        refetch();
        toast.success("Successfully deleted");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.data.message || err.error);
    }
  };

  const handleCloseForm = () => setShow(false);

  const handleEditUser = async (id: string) => {
    try {
      await updateUser({ id, data: { ...inputValues } });
      refetch();
      setShow(false);
      toast.success("Successfully updated");
    } catch (err) {
      console.log(err);
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
      const response = await uploadUserImage(formData).unwrap();
      setInputValues({ ...inputValues, photo: response.image });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <Meta title="Users"/>
      <Row className="align-items-center">
        <Col>
          <h1>Users</h1>
        </Col>
        <Col className="text-end">
          <UserModal
            show={show}
            inputValues={inputValues}
            isloading={updateLoading}
            handleCloseForm={handleCloseForm}
            handleChange={handleChange}
            handleChangeImage={handleChangeImage}
            handleEditUser={handleEditUser}
          />
        </Col>
      </Row>
      {isLoading || loadingDelete && <Loader width={100} height={100} />}
      {error && <Message variant="danger">{errMessage}</Message>}
      {isSuccess && (
       <UserTable users={users} handleOpenForm={handleOpenForm } deleteItemHandler={deleteItemHandler }/>
      )}
    </>
  );
};
