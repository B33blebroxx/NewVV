const databaseUrl = 'https://localhost:7067';

const getQuotePageInfo = async () => {
  const response = await fetch(`${databaseUrl}/quotePage`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

const editQuotePageInfo = async (quotePage) => {
  const response = await fetch(`${databaseUrl}/quotePage`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(quotePage),
  });
  const data = await response.json();
  return data;
};

export { getQuotePageInfo, editQuotePageInfo };
