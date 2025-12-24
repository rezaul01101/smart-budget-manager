import { z } from "zod";

const createTransactionnZodSchema = z.object({
  body: z.object({
    amount: z.number({
      error: "Amount is required",
    }),
    date: z.string({
      error: "Date is required",
    }),
    description: z.string().optional(),
    ledgerId: z.number({
      error: "Ledger ID is required",
    }),
    accountId: z.number().optional(),
  }),
});

export const TransactionValidation = {
  createTransactionnZodSchema,
};
