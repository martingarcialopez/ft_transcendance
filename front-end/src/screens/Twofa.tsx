import "../styles/Twofa.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux";
import { enable2FAAction } from "../redux/actions/userActions";
import { UserState } from "../redux/reducers/userReducers";
import { Button } from "@mui/material";

export const Twofa = ({ check }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [img, setImg] = useState("");
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  )
  console.log("Twofa UserLogin :", userLogin);

  useEffect(() => {
    console.log("Twofa useEffect done")
    displayQRCode()
    if (userInfo?.code2FA)
      setImg(userInfo?.code2FA);
  }, [])

  useEffect(() => {
    console.log("Twofa useEffect setImg")
    if (userInfo?.code2FA)
      setImg(userInfo?.code2FA);
  }, [userLogin])

  if (!userLogin) {
    navigate("/home")
  }

  if (userLogin.showLoading) {
    return <h1>Loading...</h1>;
  }
  const { userInfo }: UserState = userLogin;
  console.log("Twofa userInfo:", userInfo)

  if (userInfo && userInfo.twofa === false) {
    navigate('/profile');
  }
  const displayQRCode = () => {
    dispatch(enable2FAAction(userInfo?.access_token))
  };

  const handleOnChange = () => {
    navigate("/profile")
  };

  return (
    <div className="App">
      <h1>Scan the QR code</h1>
      <br />
      <h4>
        Please download the Google Authenticator app from the Play/App Store <br/> and scan the QR code to enable Two factor Authentication
      </h4>
      {img ?
        <div>
          <img src={img} alt="QR Code" />
        </div>
        :
        null
      }
      <Button onClick={() => handleOnChange()} variant="contained" color="success">
        Done
      </Button>
    </div>
  );
};