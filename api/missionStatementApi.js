const databaseUrl = 'https://localhost:7067';

const getMissionStatement = async () => {
  const response = await fetch(`${databaseUrl}/missionstatement`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export default getMissionStatement;
