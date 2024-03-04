import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Navigate } from "react-router-dom";
import { Routes } from "../../router/routes";

interface IProps {
  Component: React.ComponentType<unknown>;
}

export const AdminRoute = ({ Component }: IProps) => {
  const { userInfo } = useSelector((state: RootState) => state.reducer.auth);

  if (userInfo?.data.user.role !== "admin") {
    return <Navigate to={Routes.LOGIN} replace />;
  }
  return <Component />;
};
