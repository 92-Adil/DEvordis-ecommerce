import express from "express";
import { createOrder, deleteOrder, getAllOrder, getOrderById, getUserOrder, updateOrderStatus } from "../controllers/order.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router= express.Router();

router.route("/createOrder").post(isAuthenticated,createOrder)
router.route("/updateOrderStatus/:orderId").put(isAuthenticated,updateOrderStatus)
router.route("/deleteOrder/:orderId").delete(isAuthenticated,deleteOrder)
router.route("/getAllOrders").get(isAuthenticated,getAllOrder);
router.route("/getOrderById/:orderId").get(isAuthenticated,getOrderById);
router.route("/getOrderOfUser").get(isAuthenticated,getUserOrder)
export default router;