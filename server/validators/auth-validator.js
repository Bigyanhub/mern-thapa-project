const { z } = require("zod");

// This schema validates user signup data before it reaches your backend logic.
// It ensures all required fields are present and meet basic formatting rules.
// Using Zod helps catch invalid input early, improving security and user experience.

// Define a regular expression for basic email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Creating an object schema for signup form validation
const signupSchema = z.object({
  // Username must be a string, trimmed, 3-255 characters
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),

  // Email must be a string, trimmed, match emailRegex, 3-255 characters
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    // .refine() lets us use a custom regex for email validation
    .refine((val) => emailRegex.test(val), {
      message: "Invalid email address",
    })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),

  // Phone must be a string, trimmed, 10-20 characters
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least 10 characters" })
    .max(20, { message: "Phone must not be more than 20 characters" }),

  // Password must be a string, 7-1024 characters
  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be at least 7 characters" })
    .max(1024, { message: "Password must not be more than 1024 characters" }),
});

// Export the schema so it can be used in controllers/middleware
module.exports = signupSchema;
