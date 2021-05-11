import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginContainer from "./containers/LoginContainer";
import MainContainer from "./containers/MainContainer";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    fetch("/verify").then((res) => {
      if (res.status(200)) setIsLoggedIn((val) => (val = true));
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginContainer} />
        <Route exact path="/game" component={MainContainer} />
      </Switch>
    </Router>
  );
};

export default App;
