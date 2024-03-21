import {
  Navbar,
  Container,
  Nav,
  Badge,
  NavDropdown,
  Form,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { logout } from "../../redux/slices/authSlice";
import { Routes } from "../../router/routes";
import { useLogoutMutation } from "../../redux/slices/userApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FormEvent, useState } from "react";
import "./header.css";

export const Header = () => {
  const { cartItems } = useSelector((state: RootState) => state.reducer.cart);
  const { userInfo } = useSelector((state: RootState) => state.reducer.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword("");
    } else {
      navigate(Routes.Home);
    }
  };
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
          <Navbar.Brand>
            <div>
              <LinkContainer to="/">
                <div>
                  <img src={logo} alt="Logo" />
                  Empire-Shop
                </div>
              </LinkContainer>
              <Form className="box" onSubmit={onSubmitHandler}>
                <input
                  type="text"
                  placeholder="search..."
                  autoComplete="off"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />

                <button type="submit" className="search-btn">
                  <FaSearch />
                </button>
              </Form>
            </div>
          </Navbar.Brand>
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
