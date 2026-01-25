import { prisma } from "../../../shared/prisma";
import { User } from "../../../generated/prisma/client";
import { ResetPasswordType } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const resetPasswordService = async (data: ResetPasswordType, user: User) => {
  const { currentPassword, newPassword, confirmPassword } = data;

  const isPasswordMatched = await bcrypt.compare(
    currentPassword,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide valid current password");
  }

  if (newPassword !== confirmPassword ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Please provide valid new password");
  }

  const encodedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bycrypt_salt_rounds),
  );

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: encodedPassword,
    },
  });

  return result;
};

const updateProfileService = async (data: any, user: User) => {
  const { name, email } = data;

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: name? name : user.name,
      email: email? email : user.email,
    },
  });

  return result;
};

export const UserService = {
  resetPasswordService,
  updateProfileService
};
