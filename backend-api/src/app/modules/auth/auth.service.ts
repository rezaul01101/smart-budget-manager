import config from "../../../config";
import bcrypt from "bcrypt";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import {
  ILoginUser,
  ILoginUserResponse,
  IUserOtpCheck,
  UpdatePassword,
} from "./auth.interface";
import { createToken } from "./auth.utils";
import { prisma } from "../../../shared/prisma";
import { LedgerType, User } from "../../../generated/prisma/client";
import { email } from "zod";
import { Resend } from "resend";

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
    config.jwt.expires_in as string,
  );

  const refreshToken = createToken(
    { email: email, id: isUserExist?.id, name: isUserExist?.name },
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string,
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
        "Already exists this user. Please try again other email",
      );
    }
  }

  //generate plan password to encrypt password
  const encodedPassword = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds),
  );

  //user create
  const result = await prisma.user.create({
    data: {
      ...user,
      password: encodedPassword,
    },
  });
  if (result) {
    const ledgerDefaultData = [
      {
        name: "Health",
        type: LedgerType.EXPENSE,
        userId: Number(result.id),
        icon: "BriefcaseMedical",
        color: "emerald",
      },
      {
        name: "Food and Groceries",
        type: LedgerType.EXPENSE,
        userId: Number(result.id),
        icon: "UtensilsCrossed",
        color: "yellow",
      },
      {
        name: "Transport",
        type: LedgerType.EXPENSE,
        userId: Number(result.id),
        icon: "Bus",
        color: "blue",
      },
      {
        name: "Home Bills",
        type: LedgerType.EXPENSE,
        userId: Number(result.id),
        icon: "House",
        color: "orange",
      },
      {
        name: "Entertainment",
        type: LedgerType.EXPENSE,
        userId: Number(result.id),
        icon: "Clapperboard",
        color: "purple",
      },
      {
        name: "Salary",
        type: LedgerType.INCOME,
        userId: Number(result.id),
        icon: "Wallet",
        color: "cyan",
      },
      {
        name: "Business",
        type: LedgerType.INCOME,
        userId: Number(result.id),
        icon: "Handshake",
        color: "green",
      },
    ];
    const ledgerDefaultCreate = await prisma.ledger.createMany({
      data: ledgerDefaultData,
      skipDuplicates: true,
    });
  }
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
    throw new ApiError(httpStatus.NOT_FOUND, "Please provide valid email");
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
      "Something went wrong, please try again",
    );
  }

  // send otp email or sms

  const resend = new Resend(config?.email?.resend_api_key);

  await resend.emails.send({
    from: `Budget Manager <${config?.email?.from}>`,
    to: [email],
    subject: "Budget Manager - OTP Verification",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #111827; margin: 0;">Budget Manager</h2>
        <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">Your trusted financial companion</p>
      </div>
      
      <div style="background-color: #f9fafb; padding: 30px; border-radius: 8px; text-align: center;">
        <h3 style="color: #111827; margin: 0 0 15px 0; font-size: 24px; font-weight: 600;">Verify Your Email Address</h3>
        <p style="color: #4b5563; margin: 0 0 25px 0; font-size: 16px; line-height: 1.6;">
          We received a request to reset the password for your account. Please use the code below to verify your identity.
        </p>
        
        <div style="display: inline-block; background-color: #ffffff; padding: 15px 30px; border-radius: 6px; border: 1px solid #e5e7eb; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <span style="font-size: 32px; font-weight: 700; color: #111827; letter-spacing: 4px;">${otp}</span>
        </div>
        
        <p style="color: #6b7280; margin: 25px 0 0 0; font-size: 14px;">
          This code will expire in <strong>5 minutes</strong>
        </p>
      </div>
      
      <div style="margin-top: 30px; text-align: center;">
        <p style="color: #9ca3af; margin: 0; font-size: 12px;">
          If you didn't request this, please ignore this email.
        </p>
      </div>
    </div>
    `,
  });

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

const updatePassword = async (data: UpdatePassword) => {
  const { email, otp, password } = data;

  //find user using email
  const existEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!existEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide valid email");
  }

  //check otp valid
  const otpRecord = await prisma.passwordResetOtp.findFirst({
    where: {
      userId: existEmail.id,
      otp: otp,
    },
    orderBy: { createdAt: "desc" },
  });

  if (!otpRecord) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide valid data");
  }
  //generate password to encrypt password
  const encodedPassword = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds),
  );

  //password update
  const updatePassword = await prisma.user.update({
    where: { id: existEmail.id },
    data: { password: encodedPassword },
  });

  if (!updatePassword) {
    return false;
  }
  return true;
};

export const AuthService = {
  insertIntoDB,
  loginUser,
  forgotPassword,
  otpVeriyCheck,
  updatePassword,
};
