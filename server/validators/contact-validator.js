const { z } = require("zod");

const contactSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name must not exceed 50 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .pipe(z.email({ message: "Invalid email address" })),

  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(1000, { message: "Message must not exceed 1000 characters" }),

    website: z.string().max(0).optional()
});

module.exports = contactSchema;
