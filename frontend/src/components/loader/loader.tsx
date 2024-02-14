import { Spinner } from "react-bootstrap";

interface ISpinner {
  width: number;
  height: number;
}

export const Loader = ({ width, height }: ISpinner) => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        margin: "auto",
        display: "block",
      }}
    />
  );
};
