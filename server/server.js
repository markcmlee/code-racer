const express = require("express");
const path = require("path");
const cookieparser = require("cookie-parser");
const socket = require("socket.io");

const sessionController = require("./controllers/sessionController");
const oauthController = require("./controllers/oauthController");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
