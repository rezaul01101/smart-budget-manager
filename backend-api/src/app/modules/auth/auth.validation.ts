import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      error: 'Email is required',
    }),
    password: z.string({
      error: 'Password is required',
    }),
  }),
});
const registerZodSchema = z.object({
  body: z.object({
    name: z.string({
      error: 'Name is required',
    }),
    email: z.string({
      error: 'Email is required',
    }),
    password: z.string({
      error: 'Password is required',
    }),
  }),
});

export const AuthValidation = {
    loginZodSchema,
    registerZodSchema
  };