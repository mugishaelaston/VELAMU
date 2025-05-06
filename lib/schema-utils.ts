import { z } from "zod"

/**
 * Safely parses data with a Zod schema, returning a default value if parsing fails
 * @param schema The Zod schema to validate against
 * @param data The data to validate
 * @param defaultValue The default value to return if validation fails
 * @returns The parsed data or the default value
 */
export function safeParse<T, D>(schema: z.ZodType<T>, data: unknown, defaultValue: D): T | D {
  const result = schema.safeParse(data)
  return result.success ? result.data : defaultValue
}

/**
 * Ensures a value exists before validation
 * @param schema The Zod schema to validate against
 * @returns A new schema that handles undefined values
 */
export function ensureExists<T>(schema: z.ZodType<T>): z.ZodType<T> {
  return z.preprocess((val) => {
    // If the value is undefined or null, return an empty object
    // This prevents "Cannot read property of undefined" errors
    if (val === undefined || val === null) {
      return {}
    }
    return val
  }, schema)
}
