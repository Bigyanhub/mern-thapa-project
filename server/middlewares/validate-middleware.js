const validate = (schema) => async (req, res, next) => {
  try {
    // Validate the request body against the provided Zod schema
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    console.error(err);
    // Extract and return the first validation error message from Zod
    const message = err.issues[0].message;
    res.status(400).json({ msg: message });
  }
};

module.exports = validate;