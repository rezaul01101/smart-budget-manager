import { prisma } from "../../../shared/prisma";
import { LedgerType, User } from "../../../generated/prisma/client";
import { TransactionType } from "./transaction.interface";

const createTransactionService = async (
  transactionData: TransactionType,
  user: User
) => {
  const { amount, description, date, ledgerId, subLedgerId,accountId } = transactionData;

  const result = await prisma.transaction.create({
    data: {
      userId: user.id,
      amount: amount,
      description: description,
      date: date
        ? new Date(date)
        : new Date(new Date(date).setHours(0, 0, 0, 0)),
      ledgerId: ledgerId,
      subLedgerId: subLedgerId,
      accountId: accountId,
    },
  });

  return result;
};

const getAllTransactionsService = async (
  user: User,
  ledgerid?: string,
  type?: string
) => {
  const ledgerType =
    type === "income"
      ? LedgerType.INCOME
      : type === "expense"
      ? LedgerType.EXPENSE
      : undefined;

  const result = await prisma.transaction.findMany({
    where: {
      userId: user.id,
      ledgerId: ledgerid ? Number(ledgerid) : undefined,
      ...(ledgerType && {
        ledger: {
          type: ledgerType,
        },
      }),
    },
    include: {
      ledger: true,
      subLedger: true,
      account: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return result;
};

export const TransactionService = {
  createTransactionService,
  getAllTransactionsService,
};
