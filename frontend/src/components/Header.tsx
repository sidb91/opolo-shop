import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

import logo from "../assets/logo.jpeg";
import "../App.css";

const Header = (): React.JSX.Element => {
  const { cartItems } = useSelector((state: any) => state.cart);
  const { userInfo } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logOutApiCall] = useLogoutMutation();

  const logoutHandler = async (): Promise<void> => {

    try {
      await logOutApiCall({}).unwrap();
      dispatch(logout({}));
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <header>
      <Navbar
        className="bg-black"
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="OpoloShop" />
              OpoloShop
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link className="text-white">
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce(
                        (acc: any, currItem: any) => acc + currItem.qty,
                        0
                      )}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="text-white" href="/login">
                    <FaUser />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
