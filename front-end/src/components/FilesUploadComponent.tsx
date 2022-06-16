import "../styles/profileContainerStyles.css";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadImageAction } from '../redux/actions/userActions';
import { Button } from "@mui/material";

export const FilesUploadComponent = ({ userInfo }: any) => {
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

    return (
        <div>
            {displayImg ?
                <Button onClick={() => setDisplayImg(false)} >
                    <img src={userInfo.avatar} alt="Profile Image" className="userImage" />
                </Button>
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
    )
}