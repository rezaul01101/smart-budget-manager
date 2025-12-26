import { prisma } from "../../../shared/prisma";
import { User } from "../../../generated/prisma/client";
import { TransactionType } from "./transaction.interface";

const createTransactionService = async (
  transactionData: TransactionType,
  user: User
) => {
  const { amount, description, date, ledgerId } = transactionData;

  const result = await prisma.transaction.create({
    data: {
      userId: user.id,
      amount: amount,
      description: description,
      date: date
        ? new Date(date)
        : new Date(new Date(date).setHours(0, 0, 0, 0)),
      ledgerId: ledgerId,
    },
  });

  return result;
};

const getAllTransactionsService = async (user: User, ledgerId?: string) => {
  const result = await prisma.transaction.findMany({
    where: {
      userId: user.id,
      ledgerId: ledgerId ? Number(ledgerId) : undefined,
    },
    orderBy: {
      date: 'desc',
    },
  });

  return result;
};

export const TransactionService = {
  createTransactionService,
  getAllTransactionsService,
};
