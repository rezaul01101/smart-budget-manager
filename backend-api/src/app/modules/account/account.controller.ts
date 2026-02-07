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

const getSingleAccount = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const id = req.params.id as unknown as number;
  console.log(id);
  const result = await AccountService.getSingleAccountService(Number(id), user);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Account not found");
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Account retrieved successfully",
    data: result,
  });
});

const updateAccount = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const id = req.params.id as unknown as number;
  const { ...accountData } = req.body;
  const result = await AccountService.updateAccountService(Number(id), accountData, user);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Account not found");
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Account updated successfully",
    data: result,
  });
});

const deleteAccount = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const id = req.params.id as unknown as number;
  const result = await AccountService.deleteAccountService(Number(id), user);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Account not found");
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Account deleted successfully",
    data: result,
  });
});

export const AccountController = {
  createAccount,
  getAllAccounts,
  getSingleAccount,
  updateAccount,
  deleteAccount
};
