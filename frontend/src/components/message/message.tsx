import { ReactNode } from "react";
import { Alert } from "react-bootstrap";

interface IProps {
  variant?: string;
  children: ReactNode;
}

export const Message = ({ variant, children }: IProps) => {
  return <Alert variant={variant}>{children}</Alert>;
};
