import { ChangeEvent } from "react";
import Modal from "react-bootstrap/Modal";
import { IProducts } from "../../interfaces/IProducts";
import { IUsers } from "../../interfaces/IUsers";
import { UserBodyContainer } from "./userBodyContainer";
import { ProductBodyContainer } from "./productBodyContainer";

interface IProps {
  show: boolean;
  productValues?: IProducts;
  userValues?: IUsers;
  isloading: boolean;
  handleCloseForm(): void;
  handleChange(event: ChangeEvent): void;
  handleChangeImage(event: ChangeEvent): void;
  handleCreateProduct?(): void;
  handleEditProduct?(id: string): void;
  handleEditUser?(id: string): void;
}

export const ModalContainer = (props: IProps) => {
  const {
    show,
    productValues,
    userValues,
    isloading,
    handleCloseForm,
    handleChange,
    handleChangeImage,
    handleCreateProduct,
    handleEditProduct,
    handleEditUser,
  } = props;

  return (
    <Modal show={show} onHide={handleCloseForm} backdrop="static">
      {productValues && (
        <ProductBodyContainer
          productValues={productValues}
          isloading={isloading}
          handleChange={handleChange}
          handleChangeImage={handleChangeImage}
          handleCloseForm={handleCloseForm}
          handleCreateProduct={handleCreateProduct!}
          handleEditProduct={handleEditProduct!}
        />
      )}
      {userValues && (
        <UserBodyContainer
          userValues={userValues}
          isloading={isloading}
          handleChange={handleChange}
          handleChangeImage={handleChangeImage}
          handleCloseForm={handleCloseForm}
          handleEditUser={handleEditUser!}
        />
      )}
    </Modal>
  );
};
