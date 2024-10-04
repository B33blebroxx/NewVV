const databaseUrl = 'https://localhost:7067';

const getSupportPageData = async () => {
  const response = await fetch(`${databaseUrl}/supportpage`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await response.json();
  return data;
};

const editSupportPageData = async (supportPage) => {
  const response = await fetch(`${databaseUrl}/supportpage`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(supportPage),
  });
  const data = await response.json();
  return data;
};

export { getSupportPageData, editSupportPageData };
