import React from "react";

const LoginButton = () => {
  const login = async () => {
    const domain = "api.intra.42.fr/oauth/authorize";
    const client_id = "0d77316db950f62b0c04ce5cb7615491ce8e70486696b85c25473932430686d4";
    const redirect_uri = "http://localhost:8080";
    const scope = "public";
    const state = "aswhidl";
    const response_type = "code";

    const response = await fetch(
      `https://${domain}?` + 
      `client_id=${client_id}&` + 
      `redirect_uri=${redirect_uri}&` +
      `response_type=${response_type}&` +
      `scope=${scope}&` +
      `state=${state}&`, {
        redirect: "manual"
      }
    );

    window.location.replace(response.url);
  };

  return (
    <button className="Login-button" onClick={() => login()}>
      Log In
    </button>
  );
};

export default LoginButton;
