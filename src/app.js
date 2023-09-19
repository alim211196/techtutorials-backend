const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router/Router"); // Import the router from Router.js

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Use the router for routes
app.use("/", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
