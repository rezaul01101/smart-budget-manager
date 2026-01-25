import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/reset-password",
  auth("user"),
  // validateRequest(UserValidation.resetPasswordZodSchema),
  UserController.resetPassword
);

router.patch(
  "/update-profile",
  auth("user"),
  // validateRequest(UserValidation.resetPasswordZodSchema),
  UserController.updateProfile
);
export const UserRoute = router;
