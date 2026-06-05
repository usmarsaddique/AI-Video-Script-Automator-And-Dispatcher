export const processAutomationAPI = async (validTopics, validEmails) => {
    
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    
    const response = await fetch(`${baseURL}/api/process-automation`, {
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