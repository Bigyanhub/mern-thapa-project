const validate = (schema) => async (req, res, next) => {
  try {
    // const parseBody = await schema.parsAsync(req.body);
    const parseBody = await schema.paeseAsync ( req.body)
  } catch (error) {
    console.error(error);
  }
};
