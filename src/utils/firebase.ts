import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import type { FirebaseConfig } from '../types';

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyAqgofr8N3xtiFhcN0p_KBdAyZwWPTsa6s",
  authDomain: "iiot-trial-16eeb.firebaseapp.com",
  databaseURL: "https://iiot-trial-16eeb-default-rtdb.firebaseio.com",
  projectId: "iiot-trial-16eeb",
  storageBucket: "iiot-trial-16eeb.firebasestorage.app",
  messagingSenderId: "174776807772",
  appId: "1:174776807772:web:4ceca53b31ac24eae85199",
  measurementId: "G-NQYFCNZ064"
};

// Initialize Firebase with persistence disabled for faster writes
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

// Local state cache for instant UI updates
const relayStateCache = new Map<number, boolean>();

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const toggleRelay = async (relayId: number) => {
  try {
    const relayRef = ref(database, `relay${relayId}`);
    const newState = !(relayStateCache.get(relayId) ?? false);
    
    // Optimistic update
    relayStateCache.set(relayId, newState);
    
    // Fire-and-forget write for fastest response
    set(relayRef, newState).catch(error => {
      console.error(`Relay ${relayId} update failed:`, error);
      // Revert optimistic update on failure
      relayStateCache.set(relayId, !newState);
    });
    
    return newState;
  } catch (error) {
    console.error(`Toggle relay ${relayId} error:`, error);
    throw error;
  }
};

export const setAllRelaysOff = async () => {
  try {
    // Optimistic update
    for (let i = 1; i <= 8; i++) {
      relayStateCache.set(i, false);
    }
    
    // Parallel updates without waiting
    const updates = Array.from({ length: 8 }, (_, i) => 
      set(ref(database, `relay${i + 1}`), false)
    );
    
    await Promise.all(updates);
  } catch (error) {
    console.error("Set all relays off error:", error);
    throw error;
  }
};

export const subscribeToRelay = (relayId: number, callback: (status: boolean) => void) => {
  const relayRef = ref(database, `relay${relayId}`);
  
  return onValue(relayRef, (snapshot) => {
    const status = snapshot.val() ?? false;
    relayStateCache.set(relayId, status);
    callback(status);
  }, (error) => {
    console.error(`Relay ${relayId} subscription error:`, error);
  });
};

// Initialize relay state cache
export const initializeRelayStates = async () => {
  try {
    for (let i = 1; i <= 8; i++) {
      subscribeToRelay(i, (state) => {
        relayStateCache.set(i, state);
      });
    }
  } catch (error) {
    console.error("Relay state initialization error:", error);
  }
};