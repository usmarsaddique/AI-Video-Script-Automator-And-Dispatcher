import React, { useEffect, useRef } from 'react';
import { Clock, Info, CheckCircle2, AlertCircle } from 'lucide-react';

const LiveLogs = ({ logs, isLoading }) => {
  const logsEndRef = useRef(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const getLogIcon = (status) => {
    switch(status) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'info': return <Clock className="w-5 h-5 text-cyan-400 animate-pulse" />;
      default: return <Info className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="glass rounded-2xl p-6 md:p-8 space-y-4">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2 bg-slate-800 rounded-lg">
          <Clock className="w-5 h-5 text-slate-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-100">Live Sent Box Logs</h2>
        {isLoading && <span className="ml-auto text-xs font-medium text-emerald-400 animate-pulse bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Active</span>}
      </div>
      
      <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 min-h-[250px] max-h-[400px] overflow-y-auto font-mono text-sm space-y-3 custom-scrollbar">
        {logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2 mt-16">
            <Info className="w-8 h-8 opacity-50" />
            <p>Waiting for process to start...</p>
          </div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-colors border border-transparent hover:border-slate-800">
              <div className="mt-0.5 shrink-0">
                {getLogIcon(log.status)}
              </div>
              <div className="flex-1 space-y-1">
                <p className={`
                  ${log.status === 'error' ? 'text-red-400' : ''}
                  ${log.status === 'success' ? 'text-emerald-300' : ''}
                  ${log.status === 'info' ? 'text-cyan-200' : ''}
                `}>
                  {log.message}
                </p>
                <p className="text-xs text-slate-600">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
};

export default LiveLogs;
