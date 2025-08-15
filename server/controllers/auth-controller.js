/* -------------------------------------------------------------------------- */
/*                                 Home Logic                                 */
/* -------------------------------------------------------------------------- */
// Controller for home route
const home = (req, res) => {
  try {
    // Send a welcome message as response
    res
      .status(200)
      .send("Welcome to my page via router handled by controller shortcut");
  } catch (error) {
  // Log any errors
  console.log(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                               Register Logic                               */
/* -------------------------------------------------------------------------- */
// Controller for register route
const register = (req, res) => {
  try {
  // Log the request body (user data)
  console.log(req.body);
  // Respond with the received data
  res.status(200).json({ message: req.body });
  } catch (error) {
  // Send error response if something goes wrong
  res.status(500).json("internal server error");
  }
};

// Export controller functions
module.exports = { home, register };
