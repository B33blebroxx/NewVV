import { useState, useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import AboutMeCardCombo from '../components/cards/AboutMeCardCombo';
import getAboutMe from '../api/aboutMeApi';

export default function AboutMe() {
  const [aboutMe, setAboutMe] = useState({});
  const fetchAboutMe = async () => {
    getAboutMe().then(setAboutMe);
  };

  useEffect(() => {
    fetchAboutMe();
  }, []);

  return (
    <Box>
      <Box className="container">
        <h1>About Me</h1>
      </Box>
      <br />
      <br />
      <Divider sx={{ backgroundColor: 'black' }} />
      <br />
      <AboutMeCardCombo aboutMe={aboutMe} />
    </Box>
  );
}
