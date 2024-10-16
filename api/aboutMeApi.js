import client from '../utils/client';

const getAboutMe = async () => {
  try {
    const response = await client.get('/aboutme');
    return response.data;
  } catch (error) {
    throw new Error(`Error ${error.response.status}: ${error.response.data}`);
  }
};

const editAboutMe = async (aboutMe, userId) => {
  try {
    const response = await client.put('/aboutme', aboutMe, {
      headers: {
        userId,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error ${error.response.status}: ${error.response.data}`);
  }
};

export { getAboutMe, editAboutMe };
