import Order from "../models/orderModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
// @desc Create New Order
// @route POST /api/orders
// @access Private
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
    res.status(400).send("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
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

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getorderById = asyncHandler(async (req, res) => {
  const orders = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  }
  res.status(404).send("order not found");
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("updateOrderToPaid");
});

// @desc Update order to delivered
// @route GET /api/orders/:id/deliver
// @access Private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("updateOrderToDelivered");
});
// @desc Get all orders
// @route GET /api/orders/
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("getOrders");
});

export {
  addOrderItems,
  getMyOrders,
  getorderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrders,
};
