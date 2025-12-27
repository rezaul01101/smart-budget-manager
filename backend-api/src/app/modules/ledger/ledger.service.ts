import { prisma } from "../../../shared/prisma";
import { User } from "../../../generated/prisma/client";
import { LedgerType } from "./ledger.interface";

const createLedgerService = async (ledgerData: LedgerType, user: User) => {
  const { name, type, icon, color } = ledgerData;

  const result = await prisma.ledger.create({
    data: {
      userId: user.id,
      name: name,
      type: type,
      icon: icon,
      color: color,
    },
  });

  return result;
};
const updateLedgerService = async (
  ledgerId: number,
  ledgerData: LedgerType,
  user: User
) => {
  const { name, type, icon, color } = ledgerData;

  const result = await prisma.ledger.update({
    where: {
      id: Number(ledgerId),
      userId: Number(user.id),
    },
    data: {
      name: name,
      type: type,
      icon: icon,
      color: color,
    },
  });

  return result;
};
const getLedgersService = async (user: User, type: string) => {
  const { id } = user;

  const ledgers = await prisma.ledger.findMany({
    where: {
      userId: id,
      type:
        type == "expense" ? "EXPENSE" : type == "income" ? "INCOME" : undefined,
    },
    include: {
      transactions: {
        select: {
          amount: true,
        },
      },
    },
  });
  // calculate sum per ledger
  const result = ledgers.map((ledger) => ({
    ...ledger,
    amount: ledger.transactions.reduce((sum, tx) => sum + Number(tx.amount), 0),
  }));

  // calculate total amount (all ledgers)
  const totalAmount = result.reduce((sum, ledger) => sum + ledger.amount, 0);

  return {
    totalAmount,
    ledgers: result,
  };
};

const getLedgerByIdService = async (user: User, ledgerId: number) => {
  const ledger = await prisma.ledger.findFirst({
    where: {
      id: ledgerId,
      userId: user.id,
    },
    include: {
      transactions: true,
    },
  });

  if (!ledger) {
    throw new Error("Ledger not found");
  }

  return ledger;
};

const deleteLedgerService = async (ledgerId: number, user: User) => {
  const { id } = user;

  const result = await prisma.ledger.delete({
    where: {
      id: ledgerId,
      userId: id,
    },
  });

  return result;
};

export const LedgerService = {
  createLedgerService,
  getLedgersService,
  getLedgerByIdService,
  updateLedgerService,
  deleteLedgerService,
};
