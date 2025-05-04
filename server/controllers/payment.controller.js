import Stripe from "stripe";
import dotenv from "dotenv";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
dotenv.config({});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const createCheckoutSession = async (req, res) => {
  
  try {
    const orderData = req.body;
    if (!orderData.orderItems && orderData.orderItems.length === 0) {
      return res.status(400).json({
        message: "Order Item mot found",
        success: false,
      });
    }
    const line_items = await Promise.all(
  orderData.orderItems.map(async (item) => {
    
    // const product = await Product.findById(item.product).select("title");

    return {
      price_data: {
        currency: "pkr",
        product_data: {
          name: item.title ||"item",  
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    };
  })
);
    //create the order in db

    // const order = await Order.create({
    //   userId: req.id,
    //   orderItems,
    //   shippingAddress,
    //   totalPrice,
    //   paymentStatus: "pending",
    //   isPaid: false,
    //   isDelivered: false,
    // });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.SUCCESS_CLIENT_URL}`,
      cancel_url: `${process.env.CANCEL_CLIENT_URL}`,
      metadata: {
        
        orderId:orderData?._id.toString()
        
      },
    });
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.log("Error in the creating checkout session is", error);
  }
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;
    console.log("Received orderId in webhook:", orderId);
    

    await Order.findByIdAndUpdate(orderId, {
      isPaid: true,
      paymentStatus: "completed",
      paidAt: new Date(),
      paymentId: session.payment_intent,
    });
  }

  res.status(200).send("Webhook received");
};
