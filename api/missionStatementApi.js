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

const editMissionStatement = async (missionStatement, userId) => {
  const response = await fetch(`${databaseUrl}/missionstatement`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      userId,
    },
    credentials: 'include',
    body: JSON.stringify(missionStatement),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data;
};

export { getMissionStatement, editMissionStatement };
