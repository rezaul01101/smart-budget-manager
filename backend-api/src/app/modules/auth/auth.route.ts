import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import auth from "../../middlewares/auth";

const router = express.Router();
router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);
router.post(
  "/register",
  validateRequest(AuthValidation.registerZodSchema),
  AuthController.registerUser
);
router.post(
  "/forgot-password",
  validateRequest(AuthValidation.forgotZodSchema),
  AuthController.forgotPassword
);
router.post(
  "/otp-verify",
  validateRequest(AuthValidation.otpVerifyZodSchema),
  AuthController.otpVerify
);
router.post(
  "/update-password",
  validateRequest(AuthValidation.updatePasswordZodSchema),
  AuthController.updatePassword
);
router.post(
  "/refresh-token",
  AuthController.refreshToken
);
router.post(
  "/logout",
  auth("user"),
  AuthController.logOut
);

export const AuthRoutes = router;
