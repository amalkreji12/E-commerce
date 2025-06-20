import express from 'express';
import { placeOrder, getAllOrders, getUserOrders, updateOrderStatus, placeOrderStripe, verifyStripePayment, placeOrderRazorpay, verifyRazorPay } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import userAuth from '../middleware/userAuth.js';

const orderRouter = express.Router();

//Admin routes
orderRouter.post('/list', adminAuth, getAllOrders);
orderRouter.post('/status', adminAuth, updateOrderStatus);


//Payment routes
orderRouter.post('/place', userAuth, placeOrder);
orderRouter.post('/stripe', userAuth, placeOrderStripe);
orderRouter.post('/razorpay', userAuth, placeOrderRazorpay);

//User routes
orderRouter.post('/userorders', userAuth, getUserOrders);

//verify payment
orderRouter.post('/verifyStripe', userAuth, verifyStripePayment)
orderRouter.post('/verifyRazorPay', userAuth, verifyRazorPay);

export default orderRouter;