import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RedirectPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
  console.log("RedirectPage window.location.href", window.location.href)

  let result = window.location.href.slice(41, window.location.href.length);
  console.log("RedirectPage result", result)
}, [])

  const redirectToHomePage = () => {
    navigate("/home")
  }

  return (
    <div>
      <div>Redirect Page</div>
      <Button onClick={() => redirectToHomePage()}>
        Redirection
      </Button>
    </div>
  );
};