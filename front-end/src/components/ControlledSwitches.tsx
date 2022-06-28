import { FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { disable2FAAction } from '../redux/actions/userActions';

export const ControlledSwitches = ({ userInfo }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    userInfo.twofa ? setChecked(true) : setChecked(false)
  }, [userInfo.twofa])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (event.target.checked === false) {
      dispatch(disable2FAAction(userInfo.access_token))
    }
    else {
      navigate("/twofa")
    }
  };

  return (
    <div style={{
      position: 'absolute',
      right: 0
    }} >
      <FormControlLabel
        value="top"
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label="2FA authentification"
        labelPlacement="top"
      />

    </div>
  );
}