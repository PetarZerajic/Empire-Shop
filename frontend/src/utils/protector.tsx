import React from "react";
import { Navigate } from "react-router-dom";
import { Routes } from "../router/routes";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

interface IProps {
  Component: React.ComponentType<unknown>;
}

export const Protector = ({ Component }: IProps) => {
  const { userInfo } = useSelector((state: RootState) => state.reducer.auth);

  if (!userInfo) {
    return <Navigate to={Routes.LOGIN} replace />;
  }
  return <Component />;
};
