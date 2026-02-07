import { prisma } from "../../../shared/prisma";
import { User } from "../../../generated/prisma/client";
import { LedgerType } from "./ledger.interface";

const createLedgerService = async (ledgerData: LedgerType, user: User) => {
  const { name, type, icon, color, subLedger } = ledgerData;

  const result = await prisma.ledger.create({
    data: {
      userId: user.id,
      name: name,
      type: type,
      icon: icon,
      color: color,
    },
  });
  if (result && subLedger) {
    const subLedgerResult = await prisma.subLedger.createMany({
      data: subLedger.map((subLedger) => ({
        ledgerId: result.id,
        userId: user.id,
        name: subLedger,
      })),
    });
  }

  return result;
};
const updateLedgerService = async (
  ledgerId: number,
  ledgerData: LedgerType,
  user: User
) => {
  const { name, type, icon, color, subLedger } = ledgerData;

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
  if (!subLedger || subLedger.length === 0) {
    return result; // nothing to add
  }

  // Get existing sub-ledgers
  const existing = await prisma.subLedger.findMany({
    where: {
      ledgerId: Number(ledgerId),
      userId: Number(user.id),
    },
    select: { name: true },
  });

  const existingNames = new Set(existing.map((s) => s.name.toLowerCase()));

  // Filter only NEW sub-ledgers
  const newSubLedgers = subLedger.filter(
    (name) => !existingNames.has(name.toLowerCase())
  );

  if (newSubLedgers.length === 0) {
    return result;
  }

  await prisma.subLedger.createMany({
    data: newSubLedgers.map((name) => ({
      name,
      ledgerId: Number(ledgerId),
      userId: Number(user.id),
    })),
    skipDuplicates: true,
  });

  return result;
};
const getLedgersService = async (user: User, type: string, month: string) => {
  const { id } = user;

  // Parse month parameter (format: MM-YY, e.g., "02-26" for February 2026)
  let startDate: Date | undefined;
  let endDate: Date | undefined;

  if (month) {
    const [monthStr, yearStr] = month.split("-");
    const monthNum = parseInt(monthStr, 10);
    const yearNum = 2000 + parseInt(yearStr, 10); // Convert "26" to 2026

    // Start date: first day of the month at 00:00:00
    startDate = new Date(yearNum, monthNum - 1, 1, 0, 0, 0);

    // End date: last day of the month at 23:59:59
    endDate = new Date(yearNum, monthNum, 0, 23, 59, 59);
  }

  const ledgers = await prisma.ledger.findMany({
    where: {
      userId: id,
      type:
        type == "expense" ? "EXPENSE" : type == "income" ? "INCOME" : undefined,
    },
    include: {
      transactions: {
        where: month
          ? {
              date: {
                gte: startDate,
                lte: endDate,
              },
            }
          : undefined,
        select: {
          amount: true,
          accountId: true,
          account: {
            select: {
              name: true,
            },
          },
        },
      },
      subLedgers: {
        select: {
          name: true,
          id: true,
        },
      },
    },
    orderBy: {
      id: "desc",
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
      subLedgers: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  if (!ledger) {
    throw new Error("Ledger not found");
  }

  return ledger;
};

const deleteLedgerService = async (ledgerId: number, user: User) => {
  const { id } = user;
  console.log(ledgerId, id);
  const result = await prisma.ledger.delete({
    where: {
      id: Number(ledgerId),
      userId: Number(id),
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
