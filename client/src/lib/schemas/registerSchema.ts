import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .nonempty({ message: "Name is required" })
      .min(2, { message: "Name is too short" })
      .max(50, { message: "Name is too long" }),
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, {
        message:
          "Password must contain 8-15 characters, including uppercase, lowercase, number and special character",
      })
      .max(15, {
        message:
          "Password must contain 8-15 characters, including uppercase, lowercase, number and special character",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords did not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
