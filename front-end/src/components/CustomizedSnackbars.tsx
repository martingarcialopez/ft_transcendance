import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef, SyntheticEvent, useState } from 'react';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CustomizedSnackbars = (Status: any, message: any) => {
  const [open, setOpen] = useState(true);
  const status = Status?.status;

  console.log("CustomizedSnackbars status", status)
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  console.log("CustomizedSnackbars message :", message)

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {
        status ?
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Your profile has been successfully updated!
            </Alert>
          </Snackbar>
          :
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {!message ?
                message
                :
                "There has been an error while updating your profile."
              }

            </Alert>
          </Snackbar>
      }
    </Stack>
  );
}