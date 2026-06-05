import React, { useState } from 'react';
import { Send } from 'lucide-react';
import ScriptForm from './ScriptForm';
import LiveLogs from './LiveLogs';
import { useSSE } from '../hooks/useSSE';

const Dashboard = () => {
  const [topics, setTopics] = useState(['']);
  const [emails, setEmails] = useState(['']);
  const { logs, isLoading, startStream } = useSSE();

  const handleAddTopic = () => setTopics([...topics, '']);
  const handleRemoveTopic = (index) => {
    const newTopics = topics.filter((_, i) => i !== index);
    setTopics(newTopics.length ? newTopics : ['']);
  };
  const handleTopicChange = (index, value) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };

  const handleAddEmail = () => setEmails([...emails, '']);
  const handleRemoveEmail = (index) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails.length ? newEmails : ['']);
  };
  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleSubmit = async () => {
    const validTopics = topics.filter(t => t.trim() !== '');
    const validEmails = emails.filter(e => e.trim() !== '');

    if (validTopics.length === 0 || validEmails.length === 0) {
      alert("Please provide at least one valid topic and one valid email.");
      return;
    }

    await startStream(validTopics, validEmails);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12 font-sans selection:bg-cyan-500/30">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block p-3 rounded-2xl bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 mb-2">
            <Send className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Script Automator
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            AI-powered video script generation & bulk email dispatching.
          </p>
        </div>

        <ScriptForm 
          topics={topics}
          emails={emails}
          handleTopicChange={handleTopicChange}
          handleRemoveTopic={handleRemoveTopic}
          handleAddTopic={handleAddTopic}
          handleEmailChange={handleEmailChange}
          handleRemoveEmail={handleRemoveEmail}
          handleAddEmail={handleAddEmail}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />

        <LiveLogs logs={logs} isLoading={isLoading} />

      </div>
    </div>
  );
};

export default Dashboard;
