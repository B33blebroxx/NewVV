import React, { useState } from 'react';
import getMissionStatement from '../../api/missionStatementApi';

export default function MissionStatement() {
  const [missionStatement, setMissionStatement] = useState({});

  const fetchMissionStatement = async () => {
    getMissionStatement().then(setMissionStatement);
  };

  useState(() => {
    fetchMissionStatement();
  }, []);

  return (
    <div>
      <h5>
        {missionStatement.missionStatementText}
      </h5>
    </div>
  );
}
