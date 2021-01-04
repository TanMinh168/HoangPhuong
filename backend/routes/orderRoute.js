import express from 'express';
import Order from '../models/orderModel';
import { isAuth, isAdmin } from '../utils';

const router = express.Router();

router.get("/", isAuth, isAdmin, async (req, res) => {  //getOrder()
  const orders = await Order.find({});
  res.send(orders);
});

router.get("/mine", isAuth, async (req, res) => { // findOrderById()
  const orders = await Order.find({ userId: req.user._id });
  res.send(orders);
});

router.get("/:id", isAuth, isAdmin, async (req, res) => { // findOrderByIdWithAdmin()
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order Not Found.")
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => { //deleteOrder()
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send("Order Not Found.")
  }
});

router.post("/", isAuth, async (req, res) => { // updateOrder()
  const order = new Order({
    userId: req.body.userId,
    orderItems: req.body.orderItems,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });
  const newOrder = await order.save();
  if (newOrder) {
    return res.status(201).send({ message: "New Order Created", data: newOrder });
  }
  return res.status(500).send({ message: 'Error in Creating Order.' });
});

router.put("/:id/pay", isAuth, async (req, res) => { // payOrder()
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'paypal',
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID
      }
    }
    const updatedOrder = await order.save();
    res.send({ message: 'Order Paid.', order: updatedOrder });
  } else {
    res.status(404).send({ message: 'Order not found.' })
  }
});

export default router;