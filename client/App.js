import fetch from "node-fetch";
import React, { useEffect, useState } from "react";

import LoginContainer from "./containers/LoginContainer";
import MainContainer from "./containers/MainContainer";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // // socket.on("mySocketId", (socketId) => {
  // //   console.log("my socket id", socketId);
  // // });

  useEffect(() => {
    fetch("/verify").then((res) => {
      if (res.status == 200) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  if (!isLoggedIn) {
    return <LoginContainer />;
  }
  return <MainContainer />;
};

export default App;
