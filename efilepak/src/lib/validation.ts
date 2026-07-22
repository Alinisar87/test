import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your full name."),
    email: z.string().trim().toLowerCase().email("Enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z.string().trim().toLowerCase().email("Enter a valid email address."),
    password: z.string().min(1, "Enter your password."),
  })
  .strict();

// A numeric string from a form field -> non-negative number.
const money = z
  .union([z.string(), z.number()])
  .transform((v) => {
    const n = typeof v === "number" ? v : Number(String(v).replace(/,/g, ""));
    return Number.isFinite(n) ? n : 0;
  })
  .pipe(z.number().min(0, "Amount cannot be negative."));

// Allows negative values (net assets can be negative).
const signedMoney = z
  .union([z.string(), z.number()])
  .transform((v) => {
    const n = typeof v === "number" ? v : Number(String(v).replace(/,/g, ""));
    return Number.isFinite(n) ? n : 0;
  })
  .pipe(z.number());

export const filingInputSchema = z.object({
  taxYear: z.coerce.number().int(),
  filerType: z.enum(["SALARIED", "BUSINESS", "AOP"]),
  taxpayer: z.object({
    fullName: z.string().trim().default(""),
    cnic: z.string().trim().default(""),
    resident: z.coerce.boolean().default(true),
  }),
  income: z.object({
    salary: money,
    business: money,
    propertyGross: money,
    propertyRepairAllowance: z.coerce.boolean().default(true),
    otherNormal: money,
    finalRegimeIncome: money,
  }),
  deductions: z.object({
    zakat: money,
    donations: money,
    pensionContribution: money,
  }),
  taxPaid: z.object({
    salaryWithholding: money,
    otherAdjustable: money,
    advanceTax: money,
  }),
  wealth: z.object({
    openingNetAssets: signedMoney,
    closingNetAssets: signedMoney,
    personalExpenses: money,
    otherInflows: money,
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
