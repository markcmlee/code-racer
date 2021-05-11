const express = require("express");
const path = require("path");
const cookieparser = require("cookie-parser");
const socket = require("socket.io");

const sessionController = require("./controllers/sessionController");
const oauthController = require("./controllers/oauthController");
const apiRouter = require("./routes/api");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

const server = app.listen(PORT, () => console.log("listening on port 3000"));
const io = socket(server);

io.on("connection", (socket) => {
  socket.emit("mySocketId", socket.id, () =>
    console.log("socket connection made!")
  );

  // socket.on("newWPM", (newWPM) => {
  //   console.log(newWPM);
  //   socket.broadcast.emit("newScores", newWPM);
  // });

  socket.on("disconnect", () => console.log("user disconnected!"));
});

// if (process.env.NODE_ENV === 'production') {

app.use("/build", express.static(path.join(__dirname, "../build")));
// serve index.html on the route '/'
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});
// }

//Oauth flow for github
app.get(
  "/callback",
  oauthController.getGithubToken,
  oauthController.getUser,
  sessionController.createSession,
  (req, res) => {
    // if (process.env.NODE_ENV === "development") {
    // console.log("WE ARE IN DEV ENVIRONMENT")
    // res.status(200).send();
    res.redirect("/game");
    // } else {
    //   res.sendFile(path.join(__dirname, "../index.html"));
    // }
  }
);

// end of production mode stuff.
app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../index.html"));
});

// used to check the user's JWT.
app.get("/game", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../index.html"));
});

app.get(
  "/verify",
  sessionController.verify,
  // userController.loginUser,
  (req, res, next) => {
    // res.redirect(301, "/game");
    res.status(200).send();
  }
);

//all interactions with postgresql go through our API router
app.use("/api", apiRouter);

//generic error handler
app.use("*", (req, res, next) => {
  res.status(200).sendFile(path.resolve(__dirname, "../index.html"));
});

// Error Handler
app.use(function (err, req, res, next) {
  const defaultErr = {
    log: `'MIDDLEWARE ERROR', ${err}`,
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).send(JSON.stringify(errorObj.message));
});

module.exports = app;
