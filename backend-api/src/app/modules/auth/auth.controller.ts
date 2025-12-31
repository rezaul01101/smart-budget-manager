import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { createToken, verifyToken } from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  const { refreshToken, accessToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
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
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  let decoded: JwtPayload;

  try {
    decoded = verifyToken(refreshToken, config.jwt.refresh_secret as string);
  } catch {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  // Generate new tokens
  const accessToken = createToken(
    { email: decoded.email, id: decoded.id, name: decoded.name },
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );

  const newRefreshToken = createToken(
    { email: decoded.email, id: decoded.id, name: decoded.name },
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string
  );

  res.cookie("refreshToken", newRefreshToken, {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Token refreshed successfully",
    data: {
      accessToken,
    },
  });
});

const logOut = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }
  // clear cookie
  res.cookie("refreshToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "You are logout successfully",
    data: "",
  });
});

export const AuthController = {
  loginUser,
  registerUser,
  forgotPassword,
  otpVerify,
  updatePassword,
  refreshToken,
  logOut,
};
