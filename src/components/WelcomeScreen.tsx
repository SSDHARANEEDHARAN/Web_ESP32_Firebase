import React from 'react';
import { Zap, Shield, Smartphone, Globe } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 animate-pulse">
          <Zap className="w-20 h-20 text-blue-400 mx-auto mb-4" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          IoT Control
          <span className="text-blue-400"> Hub</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Take control of your smart devices with our advanced IoT dashboard. 
          Monitor, manage, and automate your connected relays from anywhere.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
            <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Secure Access</h3>
            <p className="text-slate-400">Protected with enterprise-grade security</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
            <Smartphone className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Mobile Ready</h3>
            <p className="text-slate-400">Responsive design for all devices</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700">
            <Globe className="w-12 h-12 text-teal-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Real-time Control</h3>
            <p className="text-slate-400">Instant updates and monitoring</p>
          </div>
        </div>
        
        <button
          onClick={onGetStarted}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
        >
          Get Started
        </button>
        
        <div className="mt-12 text-slate-500">
          <p>Powered by Firebase & React</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;