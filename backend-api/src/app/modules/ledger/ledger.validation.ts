import { z } from "zod";

enum LedgerType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

const createLedgerZodSchema = z.object({
  body: z.object({
    name: z.string({
      error: "Name is required",
    }),
    type: z.string({
      error: "Type must be INCOME or EXPENSE",
    }),
  }),
});

export const LedgerValidation = {
  createLedgerZodSchema,
};
