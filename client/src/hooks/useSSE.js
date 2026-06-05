import { useState } from 'react';
import { processAutomationAPI } from '../services/apiService';

export const useSSE = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const startStream = async (validTopics, validEmails) => {
    setIsLoading(true);
    setLogs([]); // Clear previous logs

    try {
      const response = await processAutomationAPI(validTopics, validEmails);

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunkValue = decoder.decode(value);
          
          // SSE data format is: "data: {...}\n\n"
          const lines = chunkValue.split('\n\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const parsedData = JSON.parse(line.replace('data: ', ''));
                setLogs(prev => [...prev, parsedData]);
              } catch (e) {
                console.error("Error parsing log data", e);
              }
            }
          }
        }
      }
    } catch (error) {
      setLogs(prev => [...prev, { message: `Connection Error: ${error.message}`, status: 'error', timestamp: new Date().toISOString() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return { logs, isLoading, startStream };
};
