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
router.get(
  "/:id",
  auth("user"),
  AccountController.getSingleAccount
);
router.patch(
  "/:id",
  auth("user"),
  validateRequest(AccountValidation.updateAccountZodSchema),
  AccountController.updateAccount
);
router.delete(
  "/:id",
  auth("user"),
  AccountController.deleteAccount
);



export const AccountRoute = router;
