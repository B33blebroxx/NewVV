const databaseUrl = 'https://localhost:7067';

const getOrgs = async () => {
  const response = await fetch(`${databaseUrl}/supportorgs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export default getOrgs;
