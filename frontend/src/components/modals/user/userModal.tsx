import { ModalContainer } from '../../container/modalContainer'
import { IUsers } from '../../../interfaces/IUsers';
import { ChangeEvent } from 'react';
import { UserForm } from '../../forms/create-update/user/userForm';

interface IProps {
    show:boolean
    userValues: IUsers;
    isloading: boolean;
    handleChange(event: ChangeEvent): void;
    handleChangeImage(event: ChangeEvent): void;
    handleCloseForm(): void;
    handleEditUser(id: string): void;
}
export const UserModal = (props:IProps) => {
    const {show,userValues, isloading, handleChange, handleChangeImage, handleCloseForm, handleEditUser,} = props;
      
    return (
      <ModalContainer show={show} handleCloseForm={handleCloseForm} >
        <UserForm userValues={userValues} isloading={isloading} handleChange={handleChange} handleChangeImage={handleChangeImage}
        handleCloseForm={handleCloseForm} handleEditUser={handleEditUser}/>
      </ModalContainer>
    )
}
