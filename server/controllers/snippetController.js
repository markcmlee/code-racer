const db = require("../models/coderacerModel");

const snippetController = {};

snippetController.getCategories = (req, res, next) => {
  db.Snippet.find({}, (err, data) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      const categories = [];
      data.forEach((el) => {
        if (!categories.includes(el.category)) categories.push(el.category);
      });
      res.locals.categories = categories;
      return next();
    }
  });
};

snippetController.getSnippet = (req, res, next) => {
  const chosenCategory = req.query.id;
  db.Snippet.find({ category: chosenCategory }, (err, snippets) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      const data = snippets;
      res.locals.snippet = data;
      return next();
    }
  });
};

snippetController.createDatabase = async (req, res, next) => {
  // console.log(snippets);
  const promiseArray = [];
  console.log("in create database");
  snippets.forEach((snippet) => {
    const totalWords = snippet[1].length / 5;
    const averageTime = Math.floor((totalWords / 25) * 60) + 15;
    snippet.push(averageTime);
    promiseArray.push(
      db.Snippet.create({
        category: snippet[0],
        content: snippet[1],
        meaning: snippet[2],
        maxTime: averageTime,
      })
    );
  });

  Promise.all(promiseArray).then((res) => next());
};

module.exports = snippetController;
