const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({ message: "message send sucessfully" });
  } catch (err) {
    const error = {
      status: 500,
      message: "Message not delivered",
    };

    next(error);
  }
};

module.exports = contactForm;
