import { prisma } from "../../../shared/prisma";
import { User } from "../../../generated/prisma/client";
import { AccountType, UpdateAccountType } from "./account.interface";

const createAccountService = async (accountData: AccountType, user: User) => {
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
    include: {
      transactions: {
        include: {
          ledger: true, // needed for INCOME / EXPENSE
        },
      },
    },
  });

  const accountsWithTransactionAmount = result.map((account) => {
    const transaction_amount = account.transactions.reduce((sum, txn) => {
      const amount = Number(txn.amount);

      if (txn.ledger.type === "INCOME") {
        return sum + amount; // add income
      }

      if (txn.ledger.type === "EXPENSE") {
        return sum - amount; // subtract expense
      }

      return sum;
    }, 0);

    return {
      ...account,
      balance: Number(account.balance) + transaction_amount, // 👈 separate calculated field
    };
  });

  return accountsWithTransactionAmount;
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
