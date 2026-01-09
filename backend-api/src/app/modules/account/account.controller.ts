import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { AccountService } from "./account.service";


const createAccount = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...accountData } = req.body;
  
  const result = await AccountService.createAccountService(accountData, user);
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Account not created. Please try again"
    );
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Account created successfully",
    data: result,
  });
});

const getAllAccounts = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await AccountService.getAllAccountsService(user);
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Accounts not found. Please try again"
    );
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Accounts retrieved successfully",
    data: result,
  });
});

export const AccountController = {
  createAccount,
  getAllAccounts
};
