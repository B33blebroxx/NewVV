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

const addQuote = async (quote) => {
  const response = await fetch(`${databaseUrl}/quotes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quote),
  });
  const data = await response.json();
  return data;
};

export { getQuotes, addQuote };
