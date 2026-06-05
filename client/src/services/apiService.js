export const processAutomationAPI = async (validTopics, validEmails) => {
  const response = await fetch('http://localhost:5000/api/process-automation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topics: validTopics, emails: validEmails }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};
