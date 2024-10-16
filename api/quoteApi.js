import client from '../utils/client';

const getQuotes = async () => {
  const response = await client.get('/quotes');
  return response.data;
};

const addQuote = async (newQuote) => {
  try {
    const response = await client.post('/quotes', newQuote);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to add quote: ${error.response ? error.response.data.message : error.message}`);
  }
};

const updateQuote = async (id, updatedQuote) => {
  try {
    const response = await client.put(`/quotes/${id}`, updatedQuote);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update quote: ${error.response ? error.response.data.message : error.message}`);
  }
};

const deleteQuote = async (id) => {
  try {
    const response = await client.delete(`/quotes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete quote');
  }
};

export {
  getQuotes, addQuote, updateQuote, deleteQuote,
};
