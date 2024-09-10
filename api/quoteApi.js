import axios from 'axios';

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

const addQuote = async (newQuote, token) => {
  try {
    const response = await axios.post(`${databaseUrl}/quotes`, newQuote, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to add quote: ${error.response ? error.response.data.message : error.message}`);
  }
};

const updateQuote = async (id, updatedQuote, token) => {
  try {
    const response = await axios.put(`${databaseUrl}/quotes/${id}`, updatedQuote, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update quote: ${error.response ? error.response.data.message : error.message}`);
  }
};

const deleteQuote = async (id, token) => {
  try {
    const response = await axios.delete(`${databaseUrl}/quotes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete quote');
  }
};

export {
  getQuotes, addQuote, updateQuote, deleteQuote,
};
