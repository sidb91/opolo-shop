import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";

import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";

const RegisterScreen = (): React.JSX.Element => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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

    if (validateRegisterFields()) {
      try {
        const response = await register({ name, email, password }).unwrap();

        dispatch(setCredentials({ ...response }));
        navigate(redirect);
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  const isEmail = (email: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const validateRegisterFields = (): boolean => {
    let isFormValid = true;

    if (!isEmail(email)) {
      toast.error("Invalid email");
      isFormValid = false;
    }

    if (!password || password === "") {
      toast.error("Invalid password");
      isFormValid = false;
    }

    console.log('password ', password)
    console.log('confirmPassword ', confirmPassword)
    console.log('password match ', password.trim() === confirmPassword.trim())

    if(!(password.trim() === confirmPassword.trim())){
      toast.error("Passwords don't match");
      isFormValid = false;
    }

    return isFormValid;
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      
      <Form onSubmit={submitHandler}>

        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
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

        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Sign Up
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

export default RegisterScreen;
