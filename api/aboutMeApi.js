const databaseUrl = 'https://localhost:7067';

const getAboutMe = async () => {
  const response = await fetch(`${databaseUrl}/aboutme`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data;
};

const editAboutMe = async (aboutMe, userId) => {
  const response = await fetch(`${databaseUrl}/aboutme`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      userId,
    },
    credentials: 'include',
    body: JSON.stringify(aboutMe),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data;
};

export { getAboutMe, editAboutMe };
