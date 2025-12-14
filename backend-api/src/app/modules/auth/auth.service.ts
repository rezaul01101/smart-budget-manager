import config from "../../../config";
import bcrypt from "bcrypt";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import {
  ILoginUser,
  ILoginUserResponse,
  IUserOtpCheck,
} from "./auth.interface";
import { createToken } from "./auth.utils";
import { prisma } from "../../../shared/prisma";
import { User } from "../../../generated/prisma/client";
import { email } from "zod";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  //checking exists user by email
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isUserExist.password &&
    !(await bcrypt.compare(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  //create access token & refresh token
  const accessToken = createToken(
    { email: email, id: isUserExist.id, name: isUserExist?.name },
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );

  const refreshToken = createToken(
    { email: email, id: isUserExist?.id, name: isUserExist?.name },
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};
const insertIntoDB = async (data: User): Promise<User> => {
  const { password, ...user } = data;

  //checking exists user by email
  if (user?.email) {
    const existUser = await prisma.user.findUnique({
      where: {
        email: user?.email,
      },
    });
    if (existUser) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Already exists this user. Please try again other email"
      );
    }
  }

  //generate plan password to encrypt password
  const encodedPassword = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds)
  );

  //user create
  const result = await prisma.user.create({
    data: {
      ...user,
      password: encodedPassword,
    },
  });
  return result;
};

const forgotPassword = async (email: string) => {
  //checking email exist or not
  const existEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!existEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide valid email");
  }

  // delete old OTPs
  await prisma.passwordResetOtp.deleteMany({
    where: { userId: existEmail.id },
  });

  // generate 6 digit otp
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpcreate = await prisma?.passwordResetOtp.create({
    data: {
      userId: existEmail?.id,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    },
  });

  if (!otpcreate) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong, please try again"
    );
  }

  // send otp email or sms

  if (otpcreate) {
    return true;
  }
};

const otpVeriyCheck = async (data: IUserOtpCheck) => {
  const { email, otp } = data;

  //checking email exist or not
  const existEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!existEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide valid email");
  }

  const otpRecord = await prisma.passwordResetOtp.findFirst({
    where: {
      userId: existEmail.id,
      otp: otp,
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!otpRecord) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid or expired OTP");
  }

  // mark OTP as used
  const updateUseAt = await prisma.passwordResetOtp.update({
    where: { id: otpRecord.id },
    data: { usedAt: new Date() },
  });

  if (!updateUseAt) {
    return false;
  }
  return true;
};

export const AuthService = {
  insertIntoDB,
  loginUser,
  forgotPassword,
  otpVeriyCheck,
};
