import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { uploadImageAction } from '../redux/actions/userActions';

export const FilesUploadComponent = ({ userInfo }: any) => {
    const [profileImg, setProfileImg] = useState('')
    const dispatch = useDispatch()

    const onFileChange = (e: any) => {
        setProfileImg(e.target.files[0])
    }

    const uploadImage = () => {
        const formData = new FormData()
        formData.append('file', profileImg)
        dispatch(uploadImageAction(formData, userInfo.access_token));
        // axios.post("http://localhost:3000/user/uploadProfileImage", formData, {
        // }).then(res => {
        //     console.log(res)
        // })
    }

    return (
        <div>
            <div className="form-group">
                <input type="file" onChange={onFileChange} />
            </div>
            <div className="form-group">
                <button className="btn btn-primary" onClick={() => uploadImage()}>Upload</button>
            </div>
        </div>
    )
}