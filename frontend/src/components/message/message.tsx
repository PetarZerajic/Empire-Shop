import { ReactNode } from "react";
import { Alert } from "react-bootstrap";

export const Message = (props: { variant: string; children: ReactNode }) => {
  const { variant, children } = props;

  return <Alert variant={variant}>{children}</Alert>;
};
