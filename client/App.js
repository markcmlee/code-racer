import fetch from "node-fetch";
import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

import LoginContainer from "./containers/LoginContainer";
import MainContainer from "./containers/MainContainer";

// const socket = io("http://localhost:8080");

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // socket.on("mySocketId", (socketId) => {
  //   console.log("my socket id", socketId);
  // });

  useEffect(() => {
    fetch("/verify").then((res) => {
      if (res.status == 200) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  if (!isLoggedIn) {
    return <LoginContainer />;
  } else {
    return <MainContainer />;
  }
};

export default App;
