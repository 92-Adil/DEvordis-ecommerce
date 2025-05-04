import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

const router=express.Router();

router.route("/create").post(isAuthenticated,upload.single("thumbnailUrl"),createProduct);
router.route("/update/:productId").post(isAuthenticated,upload.array("sideImages",3),updateProduct);
router.route("/getProducts").get(getAllProducts);
router.route("/getProductById/:productId").get(getProductById)
router.route("/deleteProductById/:productId").delete(deleteProduct)
export default router;
