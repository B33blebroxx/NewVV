import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import getMissionStatement from '../../api/missionStatementApi';

export default function MissionStatement() {
  const [missionStatement, setMissionStatement] = useState({});

  const fetchMissionStatement = async () => {
    getMissionStatement().then(setMissionStatement);
  };

  useEffect(() => {
    fetchMissionStatement();
  }, []);

  return (
    <Card id="mission-statement-card">
      <h1>{missionStatement.welcomeMessage}</h1>
      <br />
      <h5>
        {missionStatement.missionStatementText}
      </h5>
      <br />
      <br />
      <h6>
        {missionStatement.missionStatementAcronym}
      </h6>
    </Card>
  );
}
