import React, { useState, useEffect, useCallback } from 'react';
import { Box, Divider } from '@mui/material';
import { getAboutMe } from '../api/aboutMeApi';
import AboutMeCardCombo from '../components/cards/AboutMeCardCombo';

export default function AboutMe() {
  const [state, setState] = useState({
    aboutMe: {},
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      const data = await getAboutMe();
      setState({ aboutMe: data, loading: false, error: null });
    } catch (error) {
      console.error('Error fetching about me data:', error);
      setState((prevState) => ({ ...prevState, loading: false, error: 'Failed to load data' }));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Error: {state.error}</div>;
  }

  return (
    <Box>
      <Box className="container">
        <h1>{state.aboutMe.aboutMeHeader}</h1>
      </Box>
      <br />
      <br />
      <Divider sx={{ backgroundColor: 'black' }} />
      <br />
      <AboutMeCardCombo aboutMe={state.aboutMe} />
    </Box>
  );
}
