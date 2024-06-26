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
import { AdminRoute } from "../components/admin-route/adminRoute";
import { OrderList } from "../pages/admin/order-list/orderList";
import { ProductList } from "../pages/admin/product-list/productList";
import { UserList } from "../pages/admin/user-list/userList";

export const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={Routes.Home} element={<App />}>
        <Route
          index={true}
          path={Routes.Search + Routes.Page}
          element={<Home />}
        />

        <Route path={Routes.Product} element={<Product />} />
        <Route path={Routes.Cart} element={<Cart />} />
        <Route path={Routes.Login} element={<Login />} />
        <Route path={Routes.Register} element={<Register />} />
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
        <Route
          path={Routes.AdminOrderList}
          element={<AdminRoute Component={OrderList} />}
        />

        <Route
          path={Routes.AdminProductList + Routes.Page}
          element={<AdminRoute Component={ProductList} />}
        />

        <Route
          path={Routes.AdminUsersList}
          element={<AdminRoute Component={UserList} />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
