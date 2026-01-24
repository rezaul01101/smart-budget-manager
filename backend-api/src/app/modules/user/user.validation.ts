import { z } from "zod";

const resetPasswordZodSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      error: "Current password is required",
    }).min(1, "Current password is required"),
    newPassword: z.string({
      error: "New password is required",
    }).min(1, "New password is required"),
    confirmPassword: z.string({
      error: "Confirm password is required",
    }).min(1, "Confirm password is required"),
  }),
});


export const UserValidation = {
  resetPasswordZodSchema,
};
