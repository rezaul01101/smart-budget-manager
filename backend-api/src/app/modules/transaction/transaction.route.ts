import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { TransactionController } from "./transaction.controller";
import { TransactionValidation } from "./transaction.validation";

const router = express.Router();

router.post(
  "/create",
  auth("user"),
  validateRequest(TransactionValidation.createTransactionnZodSchema),
  TransactionController.createTransaction
);
router.get(
  "/list",
  auth("user"),
  TransactionController.getAllTransactions
);

router.delete(
  "/delete/:id",
  auth("user"),
  TransactionController.deleteTransaction
);



export const TransactionRoute = router;
