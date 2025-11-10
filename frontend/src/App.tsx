import { useState } from 'react';
import WelcomeScreen from './components/screens/WelcomeScreen';
import LoginScreen from './components/screens/LoginScreen';
import KYCVerificationScreen from './components/screens/KYCVerificationScreen';
import HomeScreen from './components/screens/HomeScreen';
import TaskCreationScreen from './components/screens/TaskCreationScreen';
import TaskDetailScreen from './components/screens/TaskDetailScreen';
import TaskProgressScreen from './components/screens/TaskProgressScreen';
import RatingsScreen from './components/screens/RatingsScreen';
import TaskerDashboard from './components/screens/TaskerDashboard';
import AdminDashboard from './components/screens/AdminDashboard';

export type Screen =
  | 'welcome'
  | 'login'
  | 'kyc'
  | 'home'
  | 'taskCreation'
  | 'taskDetail'
  | 'taskProgress'
  | 'ratings'
  | 'taskerDashboard'
  | 'adminDashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userType, setUserType] = useState<'requester' | 'tasker' | 'admin'>('requester');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNavigate={setCurrentScreen} onUserTypeSelect={setUserType} />;
      case 'login':
        return <LoginScreen onNavigate={setCurrentScreen} onUserTypeSelect={setUserType} />;
      case 'kyc':
        return <KYCVerificationScreen onNavigate={setCurrentScreen} />;
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} userType={userType} />;
      case 'taskCreation':
        return <TaskCreationScreen onNavigate={setCurrentScreen} />;
      case 'taskDetail':
        return <TaskDetailScreen onNavigate={setCurrentScreen} userType={userType} />;
      case 'taskProgress':
        return <TaskProgressScreen onNavigate={setCurrentScreen} />;
      case 'ratings':
        return <RatingsScreen onNavigate={setCurrentScreen} />;
      case 'taskerDashboard':
        return <TaskerDashboard onNavigate={setCurrentScreen} />;
      case 'adminDashboard':
        return <AdminDashboard onNavigate={setCurrentScreen} />;
      default:
        return <WelcomeScreen onNavigate={setCurrentScreen} onUserTypeSelect={setUserType} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 lg:bg-white">
      {/* Responsive container - mobile centered, fullscreen on desktop */}
      <div className="mx-auto max-w-md lg:max-w-none h-screen bg-white shadow-xl lg:shadow-none">
        {renderScreen()}
      </div>
    </div>
  );
}