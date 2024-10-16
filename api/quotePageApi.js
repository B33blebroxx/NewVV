import client from '../utils/client';

const getQuotePageInfo = async () => {
  const response = await client.get('/quotePage', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const editQuotePageInfo = async (quotePage) => {
  const response = await client.put('/quotePage', quotePage, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export { getQuotePageInfo, editQuotePageInfo };
