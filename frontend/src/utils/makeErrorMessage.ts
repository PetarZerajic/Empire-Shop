import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useLocation } from "react-router-dom";

interface IProps {
  error: FetchBaseQueryError | SerializedError | undefined;
}

export const MakeErrorMessage = ({ error }: IProps) => {
  let errMessage;
  const { pathname } = useLocation();

  if (error && "status" in error) {
    if (pathname.endsWith("/")) {
      errMessage = "data" in error ? JSON.stringify(error.data) : error.error;
    } else {
      errMessage =
        "data" in error
          ? JSON.stringify(
              (error.data as { message: string }).message || error.data
            )
          : error.error;
    }
  }
  return { errMessage };
};
