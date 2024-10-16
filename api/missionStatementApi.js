import client from '../utils/client';

const getMissionStatement = async () => {
  const response = await client.get('/missionstatement');
  return response.data;
};

const editMissionStatement = async (missionStatement, userId) => {
  const response = await client.put('/missionstatement', missionStatement, {
    headers: {
      userId,
    },
  });

  if (!response.status === 200) {
    const errorText = response.statusText;
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  return response.data;
};

export { getMissionStatement, editMissionStatement };
