import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Home } from "../pages/home/home";
import { Routes } from "./routes";
import { Product } from "../pages/product/product";
import App from "../app";
import { Cart } from "../pages/cart/cart";
import { Login } from "../pages/login/login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Routes.HOME} element={<App />}>
      <Route index={true} path={Routes.HOME} element={<Home />} />
      <Route path={Routes.Product} element={<Product />} />
      <Route path={Routes.Cart} element={<Cart />} />
      <Route path={Routes.LOGIN} element={<Login />} />
    </Route>
  )
);

export const Router = () => {
  return <RouterProvider router={router} />;
};
