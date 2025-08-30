const { z } = require("zod");

// This schema validates user signup data before it reaches your backend logic.
// It ensures all required fields are present and meet basic formatting rules.
// Using Zod helps catch invalid input early, improving security and user experience.

// Define a regular expression for basic email validation
// This regex checks for: any characters (except spaces/@ symbols) + @ + domain + . + extension
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Creating an object schema for signup form validation
// This schema will validate all fields when signupSchema.parse(data) is called
const signupSchema = z.object({
  // Username validation chain
  // Each method returns a new schema, so we can chain multiple validations
  username: z
    .string({ required_error: "Name is required" }) // Must be a string type
    .trim() // Remove whitespace from start/end
    .min(3, { message: "Name must be at least 3 characters" }) // Minimum length check
    .max(255, { message: "Name must not be more than 255 characters" }), // Maximum length check

  // Email validation chain
  // More complex because we need custom regex validation
  email: z
    .string({ required_error: "Email is required" }) // Must be a string type
    .trim() // Remove whitespace from start/end
    // .refine() allows custom validation logic beyond built-in Zod methods
    // It takes a function that returns true/false and an error message
    .refine((val) => emailRegex.test(val), {
      message: "Invalid email address",
    })
    .min(3, { message: "Email must be at least 3 characters" }) // Minimum length
    .max(255, { message: "Email must not be more than 255 characters" }), // Maximum length

  // Phone validation chain
  // Allows various phone formats by accepting 10-20 character strings
  phone: z
    .string({ required_error: "Phone is required" }) // Must be a string type
    .trim() // Remove whitespace from start/end
    .min(10, { message: "Phone must be at least 10 characters" }) // Minimum length
    .max(20, { message: "Phone must not be more than 20 characters" }), // Maximum length

  // Password validation chain
  // No trim() here because passwords might intentionally have leading/trailing spaces
  password: z
    .string({ required_error: "Password is required" }) // Must be a string type
    .min(7, { message: "Password must be at least 7 characters" }) // Minimum security requirement
    .max(1024, { message: "Password must not be more than 1024 characters" }), // Prevent DoS attacks
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .refine((val) => emailRegex.test(val), {
      message: "Invalid email address",
    })
    .min(3, { message: "Email must be at least 3 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be 7 characters" })
    .max(1024, { message: "Password must not be more than 1024 characters" }),
});

// Export the schema so it can be used in controllers/middleware for validation
// Usage: signupSchema.parse(req.body) will validate and throw error if invalid
module.exports = { signupSchema, loginSchema };
