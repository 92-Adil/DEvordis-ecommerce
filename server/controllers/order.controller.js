import { Order } from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const { orderItems, name,postalCode,country, address, city, phoneNumber, email, totalPrice } =
      req.body;
    if(!orderItems||!name||!address||!city||!phoneNumber||!email||!totalPrice){
        return res.status(400).json({
            message:"All the * filed are required"
        })
    }
    const orderData = {
      userId: req.id,
      orderItems,
      shippingAddress: {
        name,
        email,
        address,
        city,
        country,
        postalCode,
        phoneNumber,
      },
      totalPrice,
      paymentStatus: "pending",
      isPaid: false,
      isDelivered: false,
    };
    const order = ((await Order.create(orderData)));
    return res.status(200).json({
      message: "Order create successfully",
      success: true,
      order,
    });
  } catch (error) {
    console.log("Error in the creaing order contrller is", error);
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { isDelivered } = req.body;
    let order = await Order.findById(orderId).populate({path:"userId"});
    if (!order) {
      return res.status(400).json({
        message: "Order not found",
        success: false,
      });
    }
    order.isDelivered = isDelivered;
    if (isDelivered) {
      order.deliveredAt = Date.now();
    }
    await order.save();
    return res.status(200).json({
      message: "Order status updated successfully",
      success: true,
      order,
    });
  } catch (error) {
    console.log("Error in the updateing the order is", error);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(400).json({
        message: "Order not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Order deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in the delete order controller is", error);
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId").populate("orderItems.product");
    if (!orders) {
      return res.status(400).json({
        message: "Orders not found",
        success: false,
      });
    }
    return res.status(200).json({
      orders,
      success: true,
    });
  } catch (error) {
    console.log("Error in the get all order is", error);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId).populate({path:"userId"}).populate({path:"orderItems.product"});

    if (!order) {
      return res.status(400).json({
        message: "Orders not found",
        success: false,
      });
    }
    return res.status(200).json({
      order,
      success: true,
    });
  } catch (error) {
    console.log("Error in the get all order is", error);
  }
};

export const getUserOrder = async (req, res) => {
  try {
    const userId = req.id;
    const order = await Order.find({userId:userId}).populate({path:"userId"}).populate({path:"orderItems.product"});
    if (!order) {
      return res.status(400).json({
        message: "Order not found",
        success: false,
      });
    }
    return res.status(200).json({
      order,
      success: true,
    });
  } catch (error) {
    console.log("Error in the get user Order is", error);
  }
};
