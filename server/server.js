const express = require("express");
const app = express();
const router = require("./router/auth-router")

//Middleware that parse JSON from request(incoming to backend)
app.use(express.json());

/* --------------------------- Sends to the router -------------------------- */
app.use("/api/auth", router);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
