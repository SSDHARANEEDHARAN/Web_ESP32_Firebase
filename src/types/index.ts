export interface User {
  uid: string;
  email: string;
}

export interface RelayState {
  id: number;
  name: string;
  status: boolean;
  loading: boolean;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export type AppScreen = 'welcome' | 'login' | 'dashboard';