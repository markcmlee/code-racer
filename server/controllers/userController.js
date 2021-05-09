const { User } = require("../models/coderacerModel.js");
const { shady } = require("./oauthController.js");
const userController = {};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log("in user controller", username, password);
  shady(password).then((hashedPassword) => {
    console.log("hashed Password: ", hashedPassword);
    User.create({ username, hashedPassword }, (err, user) => {
      if (err) {
        console.log("error in createUser: ", err);
        return res.status(418).send("Did not create user");
      }
      res.locals.user = user;
      console.log(user);
      return next();
    });
  });
};

userController.loginUser = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne(username, (err, user) => {
    if (!err) {
      shady(password, user["hashedPassword"]).then((legit) => {
        if (legit) {
          console.log("Too legit to quit");
          res.locals.user = user;
          return next();
        } else {
          return next({
            log: "Username and password do not match",
            status: 401,
            err: { err },
          });
        }
      });
    } else {
      return next({
        log: "Username does not exist/Could not locate user",
        status: 406,
        err: { err },
      });
    }
  });
};

module.exports = userController;
