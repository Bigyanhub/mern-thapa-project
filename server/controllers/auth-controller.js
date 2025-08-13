
/* -------------------------------------------------------------------------- */
/*                                 Home Logic                                 */
/* -------------------------------------------------------------------------- */
const home =  (req, res) => {
  try {
    res
    .status(200)
    .send("Welcome to my page via router handled by controller shortcut");
  } catch (error) {
    console.log(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                               Register Logic                               */
/* -------------------------------------------------------------------------- */
const register = (req, res) =>{
  try {
    res
    .status(200)
    .send("Welcome to REGISTRATION page via router handlled by controller shortcut")
  } catch (error) {
    res
    .status(400)
    .send({msg: "page not found"})
  }
}

module.exports = { home, register };
