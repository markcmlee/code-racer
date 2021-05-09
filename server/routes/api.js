const express = require("express");

const snippetController = require("../controllers/snippetController");
const sessionController = require("../controllers/sessionController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", snippetController.getCategories, (req, res, next) =>
  res.status(200).json(res.locals.categories)
);

router.get("/snippet", snippetController.getSnippet, (req, res, next) =>
  res.status(200).json(res.locals.snippet)
);

// router.post(
//   "/highScore",
//   sessionController.verify,
//   userController.setHighScore,
//   (req, res, next) => res.status(200).json(res.locals.scoreBoardResponse)
// );

router.post("/backdoor", snippetController.createDatabase, (req, res, next) =>
  res.status(200).send()
);

module.exports = router;
