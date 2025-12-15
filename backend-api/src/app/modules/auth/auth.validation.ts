import { email, z } from "zod";

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      error: "Email is required",
    }),
    password: z.string({
      error: "Password is required",
    }),
  }),
});
const registerZodSchema = z.object({
  body: z.object({
    name: z.string({
      error: "Name is required",
    }),
    email: z.string({
      error: "Email is required",
    }),
    password: z.string({
      error: "Password is required",
    }),
  }),
});
const forgotZodSchema = z.object({
  body: z.object({
    email: z.string({
      error: "Email is required",
    }),
  }),
});
const otpVerifyZodSchema = z.object({
  body: z.object({
    email: z.string({
      error: "Email is required",
    }),
    otp: z.string({
      error: "Otp is required",
    }),
  }),
});
const updatePasswordZodSchema = z.object({
  body: z.object({
    email: z.string({
      error: "Email is required",
    }),
    otp: z
      .string({
        error: "Otp is required",
      })
      .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
    password: z
      .string({
        error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters"),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  registerZodSchema,
  forgotZodSchema,
  otpVerifyZodSchema,
  updatePasswordZodSchema,
  
};
