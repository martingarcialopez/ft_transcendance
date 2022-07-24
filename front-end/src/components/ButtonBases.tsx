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

      const response = await fetch("https://api.intra.42.fr/oauth/authorize?client_id=82931d5147b41888714cb6bb0eefb883af55984e31edb80157b9fa91b5d4dd15&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fredirect&response_type=code"
        , { redirect: "manual" }
      // )
      // , {
      //   mode: 'cors',
      //   headers: {
      //     'Access-Control-Allow-Origin':'*'
      //   }}
        );
      console.log('here we are')
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