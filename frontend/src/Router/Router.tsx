import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import { HomeScreen } from "../screens/HomeScreen";
import { Routes } from "./Routes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Routes.HOME} element={<App />}>
      <Route index={true} path={Routes.HOME} element={<HomeScreen />} />
    </Route>
  )
);

export const Router = () => {
  return <RouterProvider router={router} />;
};
