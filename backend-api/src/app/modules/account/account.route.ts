import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { AccountController } from "./account.controller";
import { AccountValidation } from "./account.validation";

const router = express.Router();

router.post(
  "/create",
  auth("user"),
  validateRequest(AccountValidation.createAccountZodSchema),
  AccountController.createAccount
);
router.get(
  "/list",
  auth("user"),
  AccountController.getAllAccounts
);



export const AccountRoute = router;
