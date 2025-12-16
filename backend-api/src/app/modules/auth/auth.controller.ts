import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../../config";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  const { refreshToken, accessToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.env === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully !",
    data: {
      accessToken,
    },
  });
});

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const { ...registerData } = req.body;
  const response = await AuthService.insertIntoDB(registerData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User registered successfully !",
    data: response,
  });
});
const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const response = await AuthService.forgotPassword(email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "OTP has been sent",
    data: response,
  });
});
const otpVerify = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const response = await AuthService.otpVeriyCheck(data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "This is valid otp",
    data: response,
  });
});
const updatePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const response = await AuthService.updatePassword(data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password updated successfully",
    data: response,
  });
});


export const AuthController = {
  loginUser,
  registerUser,
  forgotPassword,
  otpVerify,
  updatePassword
};
