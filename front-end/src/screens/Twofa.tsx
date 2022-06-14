import "../styles/Twofa.css";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux";
import { enable2FAAction, loginAction } from "../redux/actions/userActions";
import { UserState } from "../redux/reducers/userReducers";

export const Twofa = ({ check }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [code, setCode] = useState("");
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

  if (userInfo && userInfo.is2FAenable === false) {
    navigate('/profile');
  }
  const displayQRCode = () => {
    dispatch(enable2FAAction(userInfo?.access_token, navigate))
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCode(value);
    if (code.length >= 5 && userInfo) {
      dispatch(loginAction(userInfo.username, userInfo.password, code, navigate))
    }
  };

  return (
    <div className="App">
      <h1>Scan the QR code</h1>
      <br />
      <button onClick={displayQRCode} >
        Click if QR code is not well displayed
      </button>
      {img ?
        <div>
          <img src={img} alt="QR Code" />
        </div>
        :
        null
      }
      <input onChange={handleOnChange} placeholder="Write your 6 numbers code" />
    </div>
  );
};