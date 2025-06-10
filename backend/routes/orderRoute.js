import express from 'express';
import { placeOrder, getAllOrders, getUserOrders, updateOrderStatus } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import userAuth from '../middleware/userAuth.js';

const orderRouter = express.Router();

//Admin routes
orderRouter.post('/list', adminAuth, getAllOrders);
orderRouter.post('/status', adminAuth, updateOrderStatus);


//Payment routes
orderRouter.post('/place', userAuth, placeOrder);
// orderRouter.post('/stripe', userAuth, placeOrderStripe);
// orderRouter.post('/razorpay', userAuth, placeOrderRazorpay);

//User routes
orderRouter.post('/userorders', userAuth, getUserOrders);

export default orderRouter;