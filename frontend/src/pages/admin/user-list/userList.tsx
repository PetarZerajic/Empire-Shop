import {
  Button,
  Col,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { ModalContainer } from "../../../components/container/modalContainer";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useUploadUserPhotoMutation,
} from "../../../redux/slices/userApiSlice";
import { MakeErrorMessage } from "../../../utils/makeErrorMessage";
import { Loader } from "../../../components/loader/loader";
import { IUsers } from "../../../interfaces/IUsers";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import "./userList.css";

export const UserList = () => {
  const {
    data: users,
    isSuccess,
    isLoading,
    refetch,
    error,
  } = useGetUsersQuery();
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
  const [uploadUserImage] = useUploadUserPhotoMutation();
  const [deleteUser] = useDeleteUserMutation();
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
      <Row className="align-items-center">
        <Col>
          <h1>Users</h1>
        </Col>
        <Col className="text-end">
          <ModalContainer
            show={show}
            userValues={inputValues}
            isloading={updateLoading}
            handleCloseForm={handleCloseForm}
            handleChange={handleChange}
            handleChangeImage={handleChangeImage}
            handleEditUser={handleEditUser}
          />
        </Col>
      </Row>
      {isLoading && <Loader width={100} height={100} />}

      {error && errMessage}
      {isSuccess && (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th />
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.data.map((user) => (
              <tr key={user._id}>
                <td>
                  <img src={`/images/users/${user.photo}`} alt={user.name} />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role.startsWith("admin") ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes color="red" />
                  )}
                </td>
                <td>
                  <OverlayTrigger
                    overlay={<Tooltip id="tooltip-top">Edit</Tooltip>}
                  >
                    <Button
                      variant="light"
                      className="btn-sm mx-2"
                      onClick={() => handleOpenForm(user)}
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
                      onClick={() => deleteItemHandler(user._id)}
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
