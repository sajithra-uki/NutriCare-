import { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { RoleSelection } from "./components/RoleSelection";
import { MainDashboard } from "./components/MainDashboard";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [userRole, setUserRole] = useState("");

  const handleGetStarted = () => {
    setCurrentScreen("role-selection");
  };

  const handleRoleSelection = (role) => {
    setUserRole(role);
    setCurrentScreen("dashboard");
  };

  const handleLogout = () => {
    setCurrentScreen("welcome");
    setUserRole("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {currentScreen === "welcome" && (
        <WelcomeScreen onGetStarted={handleGetStarted} />
      )}

      {currentScreen === "role-selection" && (
        <RoleSelection onSelectRole={handleRoleSelection} />
      )}

      {currentScreen === "dashboard" && (
        <MainDashboard userRole={userRole} onLogout={handleLogout} />
      )}
    </div>
  );
}
