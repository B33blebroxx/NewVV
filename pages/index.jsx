import React, {
  useEffect, useState, useCallback, Suspense,
} from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import logo from '../utils/data/ValVenisLogo.png';
import { getMissionStatement } from '../api/missionStatementApi';
import Loading from '../components/Loading';

const MissionStatement = React.lazy(() => import('../components/cards/MissionStatementCard'));

function Home() {
  const [missionStatement, setMissionStatement] = useState({});

  const fetchMissionStatement = useCallback(async () => {
    try {
      const statement = await getMissionStatement();
      setMissionStatement(statement);
    } catch (error) {
      console.error('Error fetching mission statement:', error);
      // Handle error (e.g., show error message to user)
    }
  }, []);

  useEffect(() => {
    fetchMissionStatement();
  }, [fetchMissionStatement]);

  return (
    <Box className="container">
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Image src={logo} alt="Logo" width={300} height={250} style={{ marginBottom: '20px' }} />
      </Box>
      <Box>
        <Suspense fallback={<Loading />}>
          <MissionStatement missionStatement={missionStatement} />
        </Suspense>
      </Box>
    </Box>
  );
}

export default Home;
