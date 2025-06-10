import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//Cash on Delivery order controller

const placeOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount, address } = req.body;

        const orderData = {
            userId,
            items,
            totalAmount,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartDta: {} });

        res.json({ success: true, message: "Order Placed Successfully" });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};



// Get all orders for admin
const getAllOrders = async (req, res) => {

};

// Get all orders for user
const getUserOrders = async (req, res) => {

};

//Update order status by admin
const updateOrderStatus = async (req, res) => {

};


export { placeOrder, getAllOrders, getUserOrders, updateOrderStatus };