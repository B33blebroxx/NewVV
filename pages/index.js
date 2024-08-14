import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import Image from 'next/image';
import logo from '../utils/data/ValVenisLogo.png';
import MissionStatement from '../components/cards/MissionStatementCard';

function Home({ missionStatement }) {
  return (
    <Box className="container">
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Image src={logo} alt="Logo" width={300} height={250} style={{ marginBottom: '20px' }} />
      </Box>
      <br />
      <Box>
        <MissionStatement missionStatement={missionStatement} />
      </Box>
    </Box>
  );
}

export default Home;

Home.propTypes = {
  missionStatement: PropTypes.shape({
    missionStatementText: PropTypes.string.isRequired,
    missionStatementAcronym: PropTypes.string.isRequired,
    welcomeMessage: PropTypes.string.isRequired,
  }),
};

Home.defaultProps = {
  missionStatement: {
    missionStatementText: 'Mission Statement Text',
    missionStatementAcronym: 'Mission Statement Acronym',
    welcomeMessage: 'Welcome Message',
  },
};
