import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LoginContainer = () => {
  const [showHidePopup, setShowHidePopup] = useState(true);
  const text = "Toggled!";

  let message;

  useEffect(() => {
    if (showHidePopup) message = text;
    else message = "LOG IN";
  }, [showHidePopup]);

  return (
    <section className="login">
      <h2 className="crtSpecial welcome"> Welcome to</h2>
      <h3 className="crt Special title"> CODERACER</h3>
      <div className="signIn">
        <Link to="/game" className="githubButton">
          LOG IN
        </Link>
      </div>
    </section>
  );
};

export default LoginContainer;
