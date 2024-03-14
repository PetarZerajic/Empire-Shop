import { Navbar, Container, Nav, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { logout } from "../../redux/slices/authSlice";
import { Routes } from "../../router/routes";
import { useLogoutMutation } from "../../redux/slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import "./header.css";

export const Header = () => {
  const { cartItems } = useSelector((state: RootState) => state.reducer.cart);
  const { userInfo } = useSelector((state: RootState) => state.reducer.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logutApiCall().unwrap();

      dispatch(logout());
      navigate(Routes.Login);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header>
      <Navbar variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <div>
                <img src={logo} />
                Empire-Shop
              </div>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="Basic">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill>{cartItems.length}</Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.data.user.name} id="username">
                  <LinkContainer to={Routes.Profile}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to={Routes.Login}>
                  <Nav.Link>
                    <FaUser /> Log in
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo?.data.user.role === "admin" && (
                <NavDropdown title="Admin">
                  <LinkContainer to={Routes.AdminProductList}>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={Routes.AdminUsersList}>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={Routes.AdminOrderList}>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
