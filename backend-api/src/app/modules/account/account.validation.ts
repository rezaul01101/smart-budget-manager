import { z } from "zod";

const createAccountZodSchema = z.object({
  body: z.object({
    name: z.string({
      error: "Account name is required",
    }).min(1, "Account name is required"),
    type: z.enum(["BANK", "CASH", "SAVINGS", "CREDIT_CARD"], {
      error: "Account type is required",
    }),
    balance: z.number({
      error: "Balance is required",
    }).optional(),
    icon: z.string().optional(),
    color: z.string().optional(),
    description: z.string().optional(),
  }),
});

const updateAccountZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Account name is required").optional(),
    type: z.enum(["BANK", "CASH", "SAVINGS", "CREDIT_CARD"]).optional(),
    balance: z.number().optional(),
    icon: z.string().optional(),
    color: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const AccountValidation = {
  createAccountZodSchema,
  updateAccountZodSchema,
};
