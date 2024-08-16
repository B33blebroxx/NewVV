import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import logo from '../utils/data/ValVenisLogo.png';
import MissionStatement from '../components/cards/MissionStatementCard';
import getMissionStatement from '../api/missionStatementApi';

function Home() {
  const [missionStatement, setMissionStatement] = useState({});

  const fetchMissionStatement = async () => {
    getMissionStatement().then(setMissionStatement);
  };

  useEffect(() => {
    fetchMissionStatement();
  }, []);

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
