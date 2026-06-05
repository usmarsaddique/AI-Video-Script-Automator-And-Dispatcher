import React from 'react';
import { Plus, Trash2, Send, Loader2 } from 'lucide-react';

const ScriptForm = ({ topics, emails, handleTopicChange, handleRemoveTopic, handleAddTopic, handleEmailChange, handleRemoveEmail, handleAddEmail, handleSubmit, isLoading }) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Topics Section */}
        <div className="glass rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50 group-hover:bg-emerald-400 transition-colors"></div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
              <span className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">🎬</span>
              Script Topics
            </h2>
            <span className="text-xs font-medium bg-slate-800 text-slate-400 px-3 py-1 rounded-full">
              {topics.length} Items
            </span>
          </div>
          
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {topics.map((topic, index) => (
              <div key={index} className="flex gap-3 items-center group/item">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => handleTopicChange(index, e.target.value)}
                  placeholder="e.g. History of Rome..."
                  className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
                <button
                  onClick={() => handleRemoveTopic(index)}
                  className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all opacity-0 group-hover/item:opacity-100 focus:opacity-100"
                  title="Remove Topic"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleAddTopic}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-slate-700 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Add Topic</span>
          </button>
        </div>

        {/* Emails Section */}
        <div className="glass rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50 group-hover:bg-cyan-400 transition-colors"></div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
              <span className="bg-cyan-500/20 p-2 rounded-lg text-cyan-400">📧</span>
              Recipient Emails
            </h2>
            <span className="text-xs font-medium bg-slate-800 text-slate-400 px-3 py-1 rounded-full">
              {emails.length} Items
            </span>
          </div>
          
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {emails.map((email, index) => (
              <div key={index} className="flex gap-3 items-center group/item">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  placeholder="e.g. team@example.com..."
                  className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                />
                <button
                  onClick={() => handleRemoveEmail(index)}
                  className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all opacity-0 group-hover/item:opacity-100 focus:opacity-100"
                  title="Remove Email"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleAddEmail}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Add Email</span>
          </button>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`
            relative overflow-hidden group
            px-10 py-5 rounded-2xl font-bold text-lg text-white shadow-2xl transition-all
            ${isLoading ? 'bg-slate-800 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 hover:-translate-y-1 hover:shadow-emerald-500/25'}
          `}
        >
          {/* Glossy overlay effect */}
          {!isLoading && <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>}
          
          <div className="flex items-center gap-3 relative z-10">
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Send className="w-6 h-6" />
                <span>Generate & Dispatch Scripts</span>
              </>
            )}
          </div>
        </button>
      </div>
    </>
  );
};

export default ScriptForm;
