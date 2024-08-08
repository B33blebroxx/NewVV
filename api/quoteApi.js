const databaseUrl = 'https://localhost:7067';

const getQuotes = async () => {
  const response = await fetch(`${databaseUrl}/quotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export default getQuotes;
