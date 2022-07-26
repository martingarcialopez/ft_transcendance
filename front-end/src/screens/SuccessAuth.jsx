import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import { getInfoAction } from '../redux/actions/userActions'

const SuccessAuth = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getInfoAction(id, navigate))
  }, [dispatch, navigate, id]);

  return (
    <div>
      You are connected with 42 Oauth.
    </div>
  )
}

export default SuccessAuth