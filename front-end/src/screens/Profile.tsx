import { Container, TableBody, TableCell, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { UserState } from "../redux/reducers/userReducers";
import "../styles/profile.css";

export const Profile = () => {
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  )

  const { userInfo } = userLogin
  console.log("Profile Userinfo :");
  console.log(userLogin);
  const firstname = userInfo ? userInfo.firstname : null

  // "login42": null,
  // "username": "Lillon1",
  // "firstname": "Leon",
  // "lastname": "Le Papillon",
  // "password": "$2b$10$tl/UKGjAQv9woM4.BGgHr.njd686vrUwLbagijE/TZsljOg/7y4Li",
  // "avatar": null,

  return (
    <>
      <Container>
        <TableBody>
          <TableRow>
            <TableCell align="right">{userLogin.userInfo.login42}</TableCell>
            <TableCell align="right">{userLogin.userInfo.username}</TableCell>
            <TableCell align="right">{userLogin.userInfo.firstname}</TableCell>
            <TableCell align="right">{userLogin.userInfo.lastname}</TableCell>
            <TableCell align="right">{userLogin.userInfo.password}</TableCell>
            <TableCell align="right">{userLogin.userInfo.avatar}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">500 Win</TableCell>
            <TableCell align="right">150 Losses</TableCell>
            <TableCell align="right">650 Total Match</TableCell>
            <TableCell align="right">190 Level</TableCell>
          </TableRow>
        </TableBody>
      </Container>
    </>
  );
}
