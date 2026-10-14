import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters."),
  description: z
    .string()
    .trim()
    .max(300, "Description must be under 300 characters."),
  startsAt: z.string().min(1, "Pick a start date and time."),
});

export const eventFormSchema = eventSchema.extend({
  startsAt: z
    .string()
    .refine(
      (value) => !value || new Date(`${value}Z`).getTime() > Date.now(),
      "Start time must be in the future.",
    ),
});

export const pricingSchema = (sold: number) =>
  z.object({
    price: z.coerce
      .number()
      .int("Use a whole amount.")
      .min(100, "Price must be at least NGN 100.")
      .max(1_000_000, "Price must be at most NGN 1,000,000."),
    capacity: z.coerce
      .number()
      .int("Use a whole number.")
      .min(
        Math.max(1, sold),
        sold > 0
          ? `Capacity cannot be below the ${sold} tickets already sold.`
          : "Capacity must be at least 1.",
      ),
  });

export const getFieldErrors = (error: z.ZodError) =>
  Object.fromEntries(
    error.issues.map((issue) => [String(issue.path[0]), issue.message]),
  ) as Record<string, string>;
