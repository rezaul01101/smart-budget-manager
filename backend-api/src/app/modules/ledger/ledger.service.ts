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
      id: ledgerId,
      userId: user.id,
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
const getLedgersService = async (user: User) => {
  const { id } = user;

  const result = await prisma.ledger.findMany({
    where: {
      userId: id,
    },
  });

  return result;
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
  updateLedgerService,
  deleteLedgerService,
};
