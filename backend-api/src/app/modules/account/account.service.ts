import { prisma } from "../../../shared/prisma";
import { User } from "../../../generated/prisma/client";
import { AccountType, UpdateAccountType } from "./account.interface";

const createAccountService = async (
  accountData: AccountType,
  user: User
) => {
  const { name, type, balance, icon, color } = accountData;

  const result = await prisma.account.create({
    data: {
      userId: user.id,
      name: name,
      type: type,
      balance: balance || 0,
      icon: icon,
      color: color,
    },
  });

  return result;
};

const getAllAccountsService = async (user: User) => {
  const result = await prisma.account.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      id: "desc",
    },
  });

  return result;
};

const getSingleAccountService = async (id: number, user: User) => {
  const result = await prisma.account.findFirst({
    where: {
      id: id,
      userId: user.id,
    },
  });

  return result;
};

const updateAccountService = async (
  id: number,
  accountData: UpdateAccountType,
  user: User
) => {
  const { name, type, balance, icon, color } = accountData;

  const result = await prisma.account.update({
    where: {
      id: id,
      userId: user.id,
    },
    data: {
      name: name,
      type: type,
      balance: balance || 0,
      icon: icon,
      color: color,
    },
  });

  return result;
};

const deleteAccountService = async (id: number, user: User) => {
  const result = await prisma.account.delete({
    where: {
      id: id,
      userId: user.id,
    },
  });

  return result;
};

export const AccountService = {
  createAccountService,
  getAllAccountsService,
  getSingleAccountService,
  updateAccountService,
  deleteAccountService,
};
