import * as z from "zod";
export const signupInputSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .refine(
      (password: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,20}$/.test(
          password
        ),
      {
        message:
          "Password must be between 6 and 20 characters and include at least one uppercase letter, one lowercase letter, and one special character",
      }
    ),
  name: z
    .string()
    .max(30)
    .refine((name: string) => /^[a-zA-Z\s]+$/.test(name), {
      message: "Name can only contain letters and spaces",
    }),
  confirmPassword: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});
