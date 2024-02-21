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
import { Register } from "../pages/register/register";
import { Shipping } from "../pages/shipping/shipping";
import { Protector } from "../utils/protector";
import { Profile } from "../pages/profile/profile";
import { Payment } from "../pages/payment/payment";
import { Placeorder } from "../pages/placeorder/placeorder";
import { Order } from "../pages/order/order";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Routes.HOME} element={<App />}>
      <Route index={true} path={Routes.HOME} element={<Home />} />
      <Route path={Routes.Product} element={<Product />} />
      <Route path={Routes.Cart} element={<Cart />} />
      <Route path={Routes.LOGIN} element={<Login />} />
      <Route path={Routes.REGISTER} element={<Register />} />
      <Route
        path={Routes.Shipping}
        element={<Protector Component={Shipping} />}
      />
      <Route
        path={Routes.Profile}
        element={<Protector Component={Profile} />}
      />
      <Route
        path={Routes.Payment}
        element={<Protector Component={Payment} />}
      />
      <Route
        path={Routes.Placeorder}
        element={<Protector Component={Placeorder} />}
      />
      <Route path={Routes.Order} element={<Protector Component={Order} />} />
    </Route>
  )
);

export const Router = () => {
  return <RouterProvider router={router} />;
};
