const databaseUrl = 'https://localhost:7067';

const getAboutMe = async () => {
  const response = await fetch(`${databaseUrl}/aboutme`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log('About Me:', data); // Log the entire data object
  return data; // Return the entire data object
};

export default getAboutMe;
