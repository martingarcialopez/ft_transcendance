import "../styles/profileContainerStyles.css";
import { Button, Grid, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { Box } from "@mui/system";
import { updateAction, uploadImageAction } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { CustomizedSnackbars } from "./CustomizedSnackbars";
import { useParams } from "react-router-dom";
import { FilesUploadComponent } from "./FilesUploadComponent";

export const UpdateProfile = ({ userInfo }: any) => {
    const [firstname, setFirstname] = useState(userInfo.firstname)
    const [lastname, setLastname] = useState(userInfo.lastname)
    const [username, setUsername] = useState(userInfo.username)
    const [open, setOpen] = useState(false);
    const [snackbars, setSnackbars] = useState(false);
    const [statusError, setStatusError] = useState(false);
    const { id } = useParams();
    const [displayImg, setDisplayImg] = useState(true)
    const [profileImg, setProfileImg] = useState('')
    const dispatch = useDispatch()

    const onFileChange = (e: any) => {
        setProfileImg(e.target.files[0])
        console.log("FilesUploadComponent e.target.files[0] :", e.target.files[0])
    }

    const uploadImage = () => {
        const formData = new FormData()
        formData.append('file', profileImg)
        console.log("FilesUploadComponent formData :", formData)
        dispatch(uploadImageAction(formData, userInfo.access_token));
        setDisplayImg(true)
    }
    // const ref_default_img = "/game/test/test_42.jpg"
    // const ref_default_img = "/shared/avatar/mgarcia-.png"

    const handleClickOpen = () => {
        setOpen(true);
        setSnackbars(false);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setOpen(false);
        if (userInfo && firstname !== '' && lastname !== '' && username !== '') {
            dispatch(updateAction(firstname, lastname, username, userInfo.id, userInfo.access_token, userInfo.friends))
            setStatusError(true);
            setSnackbars(true);
        }
        else {
            setStatusError(false);
        }
        setDisplayImg(true);
        console.log("UpdateProfile :", {
            firstname: firstname,
            lastname: lastname,
            username: username,
        });
    }

    // const handleSetImage = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { files } = event.target;

    //     console.log("files:", files);
    //     if (files && files[0]) {
    //         var img: any = document.querySelector('img');
    //         img.src = URL.createObjectURL(files[0]); // set src to blob url
    //     }
    //     // Or if you don't prefer Object destructuring assignment...
    //     // const files = event.target.files;

    //     // Rest of the logic here
    // }

    return (
        !open ?
            <div>
                {snackbars ?
                    <CustomizedSnackbars status={statusError} />
                    :
                    null
                }
                {displayImg ?
                    <div>
                        <Button onClick={() => setDisplayImg(false)} >
                            <img src={userInfo.avatar} alt="Profile Image" className="userImage" />
                        </Button>
                        <h1 className="userName">{userInfo.username}</h1>
                        <h3 className="userNickName">{userInfo.login42}</h3>
                        <h5 className="userNickName">{userInfo.firstname}</h5>
                        <h5 className="userNickName">{userInfo.lastname}</h5>
                        {!id ?
                            <div>
                                <Button onClick={handleClickOpen} >
                                    Edit Profile
                                </Button>
                            </div>
                            :
                            null
                        }
                    </div>
                    :
                    <div>
                        <div className="form-group">
                            <input type="file" onChange={onFileChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={() => uploadImage()}>Upload</button>
                        </div>
                    </div>
                }
            </div>
            :
            <div>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        {/* <input type="file" name="image" placeholder='Image' onChange={e => handleSetImage(e)} /> */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstname"
                                required
                                fullWidth
                                id="firstname"
                                label="First Name"
                                autoFocus
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                name="lastname"
                                autoComplete="family-name"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Pseudo"
                                name="username"
                                autoComplete="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Validate change
                    </Button>
                </Box>
            </div>
    );
};