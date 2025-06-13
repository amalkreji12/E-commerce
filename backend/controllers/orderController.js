import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

//global variables
const currency = 'usd';
const delivery_fee = 10

//Gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



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


//Place order using Stripe
const placeOrderStripe = async (req, res) => {

    try {
        const { userId, items, totalAmount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            totalAmount,
            address,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Fee'
                },
                unit_amount: delivery_fee * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


//Stripe payment verify
const verifyStripePayment = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true })
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}



// Get all orders for admin
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders })
    } catch (error) {
        console.error("Error fetching user orders:", error);
    }
};

// Get all orders for user
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
    }
};

//Update order status by admin
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Order status updated successfully" })
    } catch (error) {
        console.error("Error updating order status:", error);
    }
};


export { placeOrder, getAllOrders, getUserOrders, updateOrderStatus, placeOrderStripe, verifyStripePayment };
