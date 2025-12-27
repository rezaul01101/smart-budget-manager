import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { LedgerService } from "./ledger.service";

const createLedger = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...ledgerData } = req.body;
  console.log(ledgerData);
  const result = await LedgerService.createLedgerService(ledgerData, user);
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Ledger not created. Please try again"
    );
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ledger created successfully",
    data: result,
  });
});
const updateLedger = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const ledgerId = req.params.id as unknown as number;
  const { ...ledgerData } = req.body;

  const result = await LedgerService.updateLedgerService(
    ledgerId,
    ledgerData,
    user
  );
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Ledger not updated. Please try again"
    );
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ledger updated successfully",
    data: result,
  });
});
const getLedgers = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { type } = req.query;
  const result = await LedgerService.getLedgersService(user, type as string);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Ledger not found");
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ledger retrieved successfully",
    data: result,
  });
});
const getLedgerById = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const ledgerId = req.params.id as unknown as number;
  console.log(ledgerId);
  const result = await LedgerService.getLedgerByIdService(user, Number(ledgerId));
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Ledger not found");
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ledger retrieved successfully",
    data: result,
  });
});
const deleteLedger = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const ledgerId = req.params.id as unknown as number;
  const result = await LedgerService.deleteLedgerService(ledgerId, user);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Ledger not found");
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ledger deleted successfully",
    data: "",
  });
});

export const LedgerController = {
  createLedger,
  getLedgers,
  getLedgerById,
  updateLedger,
  deleteLedger,
};
