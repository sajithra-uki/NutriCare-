import { useState } from "react";
import { WelcomeScreen } from "@/app/components/WelcomeScreen";
import { RoleSelection } from "@/app/components/RoleSelection";
import { MainDashboard } from "@/app/components/MainDashboard";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [userRole, setUserRole] = useState('');

  const handleGetStarted = () => {
    setCurrentScreen('role-selection');
  };

  const handleRoleSelection = (role) => {
    setUserRole(role);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentScreen('welcome');
    setUserRole('');
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onGetStarted={handleGetStarted} />
      )}
      
      {currentScreen === 'role-selection' && (
        <RoleSelection onSelectRole={handleRoleSelection} />
      )}
      
      {currentScreen === 'dashboard' && (
        <MainDashboard userRole={userRole} onLogout={handleLogout} />
      )}
    </div>
  );
}
