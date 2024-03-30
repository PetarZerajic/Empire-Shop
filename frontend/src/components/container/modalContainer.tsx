import {  ReactNode } from "react";
import Modal from "react-bootstrap/Modal";

interface IProps {
  show: boolean;
  children: ReactNode
  handleCloseForm(): void;
}

export const ModalContainer = (props: IProps) => {
  const {show, handleCloseForm, children} = props;
    return (
      <Modal show={show} onHide={handleCloseForm} backdrop="static">
        {children}
      </Modal>
    );
  };
