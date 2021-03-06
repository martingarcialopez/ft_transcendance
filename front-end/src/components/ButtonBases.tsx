import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Image, ImageBackdrop, ImageButton, ImageMarked, ImageSrc } from './Button';

const images = [
  {
    url: "./42_logo.jpg",
    title: 'Connect to 42',
    width: '40%',
    to: 'login'
  },
  {
    url: './cat_fond.jpg',
    title: 'Login',
    width: '30%',
  },
  {
    url: './dog_fond.jpg',
    title: 'Sign up',
    width: '30%',
  },
];

const ButtonBases = () => {
  const navigate = useNavigate();

  const login = async (image: String) => {
    console.log(image);
    if (image === 'Sign up')
      navigate('/signup');

    else if (image === 'Login')
      navigate('/login');

    else {
      const domain = "api.intra.42.fr/oauth/authorize";
      const client_id = "82931d5147b41888714cb6bb0eefb883af55984e31edb80157b9fa91b5d4dd15";
      const redirect_uri = `http://localhost:8080/auth/redirect`;
      const scope = "public";
      //const state = "aswhidl";
      const response_type = "code";

      const response = await fetch(
        `https://${domain}?` +
        `client_id=${client_id}&` +
        `redirect_uri=${redirect_uri}&` +
        `response_type=${response_type}&` +
        `scope=${scope}&` //+
        /*`state=${state}&`*/, {
        redirect: "manual"
      }
      );
      window.location.replace(response.url);
    }

  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
          onClick={() => login(image.title)}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
}

export default ButtonBases