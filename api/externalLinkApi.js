import client from '../utils/client';

const getExternalLinks = async () => {
  try {
    const response = await client.get('/externalLinks');
    return response.data;
  } catch (error) {
    console.error('Error fetching external links:', error.message);
    throw error;
  }
};

const editExternalLink = async (linkData) => {
  try {
    const response = await client.put(`/externalLinks/${linkData.id}`, linkData);
    return response.data;
  } catch (error) {
    console.error('Error updating external link:', error.message);
    throw error;
  }
};

const deleteExternalLink = async (id) => {
  try {
    await client.delete(`/externalLinks/${id}`);
  } catch (error) {
    console.error('Error deleting external link:', error.message);
    throw error;
  }
};

const addExternalLink = async (linkData) => {
  try {
    const response = await client.post('/externalLinks', linkData);
    return response.data;
  } catch (error) {
    console.error('Error adding external link:', error.message);
    throw error;
  }
};

export {
  getExternalLinks, editExternalLink, deleteExternalLink, addExternalLink,
};
