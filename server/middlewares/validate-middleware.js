const validate = (schema) => async (req, res, next) => {
  try {
    // Validate the request body against the provided Zod schema
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    console.error(err);

    const error = {
      status: 400,
      message: "Fill the input properly",
      extraDetails: err.issues[0].message,
    };

    console.log(error);
    next(error);
  }
};

module.exports = validate;
