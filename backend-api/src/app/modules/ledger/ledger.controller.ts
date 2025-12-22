import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { LedgerService } from "./ledger.service";

const createLedger = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...ledgerData } = req.body;
  console.log(ledgerData)
  const result = await LedgerService.createLedgerService(ledgerData,user);
  if (!result) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Ledger not created. Please try again");
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ledger created successfully",
    data: result,
  });
});
const getLedgers = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await LedgerService.getLedgersService(user);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Ledger not found");
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ledger created successfully",
    data: result,
  });
});

export const LedgerController = {
  createLedger,
  getLedgers
};
