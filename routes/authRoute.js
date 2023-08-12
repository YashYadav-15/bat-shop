import express from "express";
import {
  forgotPasswordController,
  getAllOrdersController,
  getOrdersController,
  loginController,
  orderStatusController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// CREATING ROUTER OBJECT
const router = express.Router();

// ROUTING

// REGISTER || METHORD POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// FORGOT PASSWORD || POST
router.post("/forgot-password", forgotPasswordController);

// TEST ROUTE
router.get("/test", requireSignIn, isAdmin, testController);

// PROTECTED USER ROUTE AUTH
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// PROTECTED ADMIN ROUTE AUTH
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// UPDATE PROFILE
router.put("/profile", requireSignIn, updateProfileController);

// ORDERS
router.get("/orders", requireSignIn, getOrdersController);

// ALL ORDERS
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// ORDER STATUS UPDATE
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
