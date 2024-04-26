import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery
} from "../slices/ordersApiSlice";

import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: isPayOrderLoading }] = usePayOrderMutation();

  const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();

  const {
    data: payPalApiData,
    isLoading: loadingPayPal,
    error: errorPayPal
  } = useGetPayPalClientIdQuery({});

  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && payPalApiData.clientId) {
      const loadPayPalScript = async () => {
        payPalDispatch({
          type: "resetOptions",
          value: {
            clientId: payPalApiData.clientId,
            currency: "USD",
          },
        });

        //payPalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, payPalApiData, loadingPayPal, errorPayPal, payPalDispatch]);

  const onApproveTest = async () => {
    await payOrder({ orderId, details: { payer : {}} });
    refetch(); //to update paid status on screen
    toast.success("Payment successful")
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(async function(details: any) {
        try {
            await payOrder({ orderId, details });
            refetch(); //to update paid status on screen
            toast.success("Payment successful")
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    })
  };

  const onError = (error: any) => {
    toast.error(error?.data?.message || error.message);
  };

  const createOrder = (data: any, actions: any): Promise<string> => {
    return actions.order.create({
        purchase_units: [
            {
                amount: {
                    value: order.totalPrice
                }
            }
        ]
    }).then((orderId: any) => {
        return orderId;
    });
  };

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

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address},{order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>

              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              {order.orderItems.map((orderItem: any, index: number) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image
                        src={orderItem.image}
                        alt={orderItem.name}
                        rounded
                        fluid
                      />
                    </Col>
                    <Col>
                      <Link to={`/products/${orderItem.product}`}>
                        {orderItem.name}
                      </Link>
                    </Col>
                    <Col md={4}>
                      {orderItem.qty} X {orderItem.price} = $
                      {orderItem.qty * orderItem.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {isPayOrderLoading && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: "10px" }}
                      >
                        Test Pay Order
                      </Button>

                      <div>
                        <PayPalButtons
                          style={{ layout: "vertical" }}
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}

              {/* MARK AS DELIVERED PLACEHOLDER */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
