import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { TransactionService } from "./transaction.service";


const createTransaction = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...transactionData } = req.body;
  
  const result = await TransactionService.createTransactionService(transactionData, user);
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Transaction not created. Please try again"
    );
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transaction created successfully",
    data: result,
  });
});

const getAllTransactions = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ledgerid } = req.query;
  const result = await TransactionService.getAllTransactionsService(user, ledgerid as string | undefined);
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Transactions not found. Please try again"
    );
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Transactions retrieved successfully",
    data: result,
  });
});

export const TransactionController = {
  createTransaction,
  getAllTransactions
};
