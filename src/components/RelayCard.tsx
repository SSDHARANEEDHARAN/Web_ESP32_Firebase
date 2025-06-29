import React from 'react';
import { Power, Zap } from 'lucide-react';
import type { RelayState } from '../types';

interface RelayCardProps {
  relay: RelayState;
  onToggle: (id: number) => void;
}

const RelayCard: React.FC<RelayCardProps> = ({ relay, onToggle }) => {
  const { id, name, status, loading } = relay;

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 transform hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <div className={`p-2 rounded-full ${status ? 'bg-green-500/20' : 'bg-slate-700/50'}`}>
          {status ? (
            <Zap className="w-5 h-5 text-green-400" />
          ) : (
            <Power className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-slate-400 mb-2">Status</p>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${status ? 'bg-green-400' : 'bg-slate-500'} ${status ? 'animate-pulse' : ''}`}></div>
          <span className={`font-medium ${status ? 'text-green-400' : 'text-slate-400'}`}>
            {loading ? 'Loading...' : (status ? 'ON' : 'OFF')}
          </span>
        </div>
      </div>

      <button
        onClick={() => onToggle(id)}
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:cursor-not-allowed disabled:opacity-50 ${
          status
            ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
            : 'bg-slate-600 hover:bg-slate-700 text-white focus:ring-slate-500'
        }`}
      >
        {loading ? 'Processing...' : (status ? 'Turn OFF' : 'Turn ON')}
      </button>
    </div>
  );
};

export default RelayCard;