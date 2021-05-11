const jwt = require("jsonwebtoken");
const secret = "thisisasecret";

const sessionController = {};

sessionController.createSession = (req, res, next) => {
  const token = jwt.sign(res.locals.profile, secret, { expiresIn: "1h" });
  res.cookie("ssid", token, { httpOnly: true });
  return next();
};

sessionController.verify = (req, res, next) => {
  jwt.verify(req.cookies.ssid, secret, (err, result) => {
    if (err) {
      res.status(404).send(`Couldn't verify JWT`);
    } else {
      res.locals.verifiedjwt = result;
      return next();
    }
  });
};

module.exports = sessionController;
