import express from "express";
import {
  login,
  logout,
  refreshAccessToken,
  register,
  updateUser,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").put(isAuthenticated, updateUser);
router.route("/refresh-token").get(refreshAccessToken);
export default router;
