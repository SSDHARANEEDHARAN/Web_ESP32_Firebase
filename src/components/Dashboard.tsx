import React, { useState, useEffect } from 'react';
import { LogOut, Power, User, Zap } from 'lucide-react';
import RelayCard from './RelayCard';
import { logoutUser, toggleRelay, setAllRelaysOff, subscribeToRelay } from '../utils/firebase';
import type { RelayState } from '../types';

interface DashboardProps {
  onLogout: () => void;
  userEmail: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, userEmail }) => {
  const [relays, setRelays] = useState<RelayState[]>([
    { id: 1, name: 'Relay 1', status: false, loading: true },
    { id: 2, name: 'Relay 2', status: false, loading: true },
    { id: 3, name: 'Relay 3', status: false, loading: true },
    { id: 4, name: 'Relay 4', status: false, loading: true },
    { id: 5, name: 'Relay 5', status: false, loading: true },
    { id: 6, name: 'Relay 6', status: false, loading: true },
    { id: 7, name: 'Relay 7', status: false, loading: true },
    { id: 8, name: 'Relay 8', status: false, loading: true },
  ]);
  const [allOffLoading, setAllOffLoading] = useState(false);

  useEffect(() => {
    const unsubscribes = relays.map((relay) => {
      return subscribeToRelay(relay.id, (status) => {
        setRelays(prev => prev.map(r => 
          r.id === relay.id 
            ? { ...r, status, loading: false }
            : r
        ));
      });
    });

    return () => {
      unsubscribes.forEach(unsubscribe => unsubscribe());
    };
  }, []);

  const handleToggleRelay = async (relayId: number) => {
    setRelays(prev => prev.map(r => 
      r.id === relayId ? { ...r, loading: true } : r
    ));

    try {
      await toggleRelay(relayId);
    } catch (error) {
      console.error('Error toggling relay:', error);
      setRelays(prev => prev.map(r => 
        r.id === relayId ? { ...r, loading: false } : r
      ));
    }
  };

  const handleAllOff = async () => {
    setAllOffLoading(true);
    try {
      await setAllRelaysOff();
    } catch (error) {
      console.error('Error turning all relays off:', error);
    } finally {
      setAllOffLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      onLogout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const activeRelays = relays.filter(r => r.status).length;
  const totalRelays = relays.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
                <Zap className="w-8 h-8 text-blue-400 mr-3" />
                IoT Control Dashboard
              </h1>
              <div className="flex items-center text-slate-300">
                <User className="w-4 h-4 mr-2" />
                {userEmail}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-400">Active Relays</p>
                <p className="text-2xl font-bold text-white">{activeRelays}/{totalRelays}</p>
              </div>
              
              <button
                onClick={handleLogout}
                className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Relay Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {relays.map((relay) => (
            <RelayCard
              key={relay.id}
              relay={relay}
              onToggle={handleToggleRelay}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={handleAllOff}
              disabled={allOffLoading}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800 flex items-center space-x-2"
            >
              <Power className="w-5 h-5" />
              <span>{allOffLoading ? 'Turning Off...' : 'All OFF'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500">
          <p>Created by Tharanee</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;