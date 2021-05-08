const fetch = require("node-fetch");

const oauthController = {};

oauthController.getGithubToken = (req, res, next) => {
  fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
      Accept: "Application/JSON",
    },
    body: JSON.stringify({
      client_id: "",
    }),
  });
};
