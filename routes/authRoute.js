import express from "express";
import {
  loginController,
  testController,
  registerController,
  forgotPasswordController,
  updateProfileController,
  orderStatusController,
  getAllOrdersController,
  // updateProfileCon
} from "../controllers/authController.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing
// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// Forgot Password || POST
router.post('/forgot-password',forgotPasswordController)

// test routes
router.get("/test",requireSignIn,isAdmin, testController);

// protected user route auth
router.get("/user-auth",requireSignIn,(req,res)=>{
  res.status(200).send({ok:true})
})

// protected admin route auth
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
  res.status(200).send({ok:true})
})

// update profile
router.put('/profile',requireSignIn,updateProfileController)


//orders
router.get("/orders", requireSignIn, getAllOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
export default router;
