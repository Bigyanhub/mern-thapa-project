const { z } = require("zod");

// Signup validation schema with enhanced security and user experience
const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(30, { message: "Username must not exceed 30 characters" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "Username can only contain letters, numbers, underscores, and hyphens",
    }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .pipe(z.email({ error: "Invalid email address" })),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .regex(/^\+?[1-9]\d{9,14}$/, {
      message:
        "Please enter a valid phone number (10-15 digits, optional + prefix)",
    }),

  // Password validation with security requirements
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password must not exceed 128 characters" })
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
});

// Login validation schema - simpler requirements for existing users
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .pipe(z.email({ error: "Invalid email address" })),

  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),
});

module.exports = { signupSchema, loginSchema };
