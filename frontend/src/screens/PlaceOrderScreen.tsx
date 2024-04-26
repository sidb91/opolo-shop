import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";

import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state: any) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  const [createOrder, {isLoading, error }] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    try {
        const response = await createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            taxPrice: cart.taxPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice
        }).unwrap();

        dispatch(clearCartItems({}))
        navigate(`/order/${response._id}`)
    } catch (error) {
        toast.error(error?.data?.message || error?.error);
    }
  }

  if (error) {
    if ("status" in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg: string =
        "error" in error ? error.error : JSON.stringify(error.data);

      return <Message variant="danger">{errMsg}</Message>;
    } else {
      // you can access all properties of `SerializedError` here
      return <Message variant="danger">{error.message}</Message>;
    }
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your Cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item: any, index: number) => (
                    <Row key={index}>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} rounded fluid />
                      </Col>
                      <Col>
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} X {item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Items:</Col>
                        <Col>${cart.itemsPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Shipping:</Col>
                        <Col>${cart.shippingPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Tax:</Col>
                        <Col>${cart.taxPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Total:</Col>
                        <Col>${cart.totalPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Button type="button" 
                        className="btn-block"
                        disabled={cart.cartItems.length === 0}
                        onClick={handlePlaceOrder}>
                    Place Order
                    </Button>
                    {isLoading && <Loader />}
                </ListGroup.Item>
            </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
