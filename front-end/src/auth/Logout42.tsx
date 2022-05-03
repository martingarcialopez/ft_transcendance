import React from "react";

const LogoutButton = () => {
  const logout = async () => {
    const domain = "api.intra.42.fr/oauth/authorize";
    const client_id = "0d77316db950f62b0c04ce5cb7615491ce8e70486696b85c25473932430686d4";
    const returnTo = "http://localhost:8080";

    const response = await fetch(
      `https://${domain}/logout?client_id=${client_id}&returnTo=${returnTo}`,
      { redirect: "manual" }
    );

    window.location.replace(response.url);
  };

  return (
    <button className="Login-button" onClick={() => logout()}>
      Log out
    </button>
  );
};

export default LogoutButton;
