import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";

import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";

const LoginScreen = (): React.JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state: any) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e: any): Promise<void> => {
    e.preventDefault();

    if (validateSignInFields()) {
      try {
        const response = await login({ email, password }).unwrap();

        dispatch(setCredentials({ ...response }));
        navigate(redirect);
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  const isEmail = (email: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const validateSignInFields = (): boolean => {
    let isFormValid = true;

    if (!isEmail(email)) {
      toast.error("Invalid email");
      isFormValid = false;
    }

    if (!password || password === "") {
      toast.error("Invalid password");
      isFormValid = false;
    }

    return isFormValid;
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Sign In
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?
          <Link
            className="ms-1"
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
