import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { UserService } from "./user.service";


const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...data } = req.body;
  
  const result = await UserService.resetPasswordService(data, user);
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong, please try again"
    );
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password reset successfully",
    data: result,
  });
});



export const UserController = {
  resetPassword,
};
