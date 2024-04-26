import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../model/orderModel.js";

//@desc Create new order
//@routes POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((order) => ({
        ...order,
        product: order._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//@desc Get logged in user orders
//@routes GET /api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

//@desc Get order by id
//@routes GET /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    
    if(order){
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

//@desc Update order to paid
//@routes PUT /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  
  const order = await Order.findById(req.params.id);

  if(order){
    order.isPaid = true;  
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc Update order to delivered
//@routes PUT /api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("updateOrderToDelivered");
});

//@desc get all orders
//@routes GET /api/orders/
//@access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("get all Orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
