import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import { auth } from './utils/firebase';
import type { AppScreen, User } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
        });
        setCurrentScreen('dashboard');
      } else {
        setUser(null);
        if (currentScreen === 'dashboard') {
          setCurrentScreen('welcome');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentScreen]);

  const handleGetStarted = () => {
    setCurrentScreen('login');
  };

  const handleLoginSuccess = () => {
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('welcome');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  switch (currentScreen) {
    case 'welcome':
      return <WelcomeScreen onGetStarted={handleGetStarted} />;
    case 'login':
      return <LoginScreen onLoginSuccess={handleLoginSuccess} onBack={handleBackToWelcome} />;
    case 'dashboard':
      return user ? (
        <Dashboard onLogout={handleLogout} userEmail={user.email} />
      ) : (
        <WelcomeScreen onGetStarted={handleGetStarted} />
      );
    default:
      return <WelcomeScreen onGetStarted={handleGetStarted} />;
  }
}

export default App;