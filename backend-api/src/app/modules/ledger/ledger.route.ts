import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { LedgerValidation } from "./ledger.validation";
import { LedgerController } from "./ledger.controller";

const router = express.Router();

router.post(
  "/create",
  auth("user"),
  validateRequest(LedgerValidation.createLedgerZodSchema),
  LedgerController.createLedger
);
router.get(
  "/list",
  auth("user"),
  LedgerController.getLedgers
);
router.get(
  "/:id",
  auth("user"),
  LedgerController.getLedgerById
);
router.put(
  "/update/:id",
  auth("user"),
  validateRequest(LedgerValidation.updateLedgerZodSchema),
  LedgerController.updateLedger
);
router.delete(
  "/:id",
  auth("user"),
  LedgerController.deleteLedger
);


export const LedgerRoute = router;
