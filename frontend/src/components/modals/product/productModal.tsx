import { ChangeEvent } from "react";
import { IProducts } from "../../../interfaces/IProducts";
import { ModalContainer } from "../../container/modalContainer";
import { ProductForm } from "../../forms/create-update/product/productForm";

interface IProps {
    show:boolean
    inputValues: IProducts;
    isloading: boolean;
    handleChange(event: ChangeEvent): void;
    handleChangeImage(event: ChangeEvent): void;
    handleCloseForm(): void;
    handleCreateProduct(): void;
    handleEditProduct(id: string): void;
}
  
export const ProductModal = (props:IProps) => {
    const {show,inputValues, isloading, handleChange, handleChangeImage, handleCloseForm, handleCreateProduct, handleEditProduct,} = props;
    return (
      
      <ModalContainer show={show} handleCloseForm={handleCloseForm}>
        <ProductForm inputValues={inputValues} isloading={isloading} handleChange={handleChange} 
          handleChangeImage={handleChangeImage} handleCloseForm={handleCloseForm} handleCreateProduct={handleCreateProduct} 
          handleEditProduct={handleEditProduct }/>
      </ModalContainer>
    )
}
