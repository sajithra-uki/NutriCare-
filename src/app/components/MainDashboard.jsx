import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Home, User, Activity, Apple, BookOpen, TrendingUp, 
  Users, Bell, Menu, X, Calendar, AlertCircle, CheckCircle
} from "lucide-react";

import  MalnutritionScreening  from "./MalnutritionScreening";
import  FoodRecommendations  from "./FoodRecommendations";
import MealPlanner  from "./MealPlanner";
import GrowthMonitoring  from "./GrowthMonitoring";
import HealthWorkerTools  from "./HealthWorkerTools";
import EducationHub from "./EducationHub";
import  ProfileManager  from "./ProfileManager";

// FIXED PATH for Vite
import "../../styles/dashboard.css";

export default function MainDashboard({ userRole, onLogout }) {
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: "home", label: "Dashboard", icon: Home, roles: ["all"] },
    { id: "profile", label: "Profile", icon: User, roles: ["all"] },
    { id: "screening", label: "Health Screening", icon: Activity, roles: ["all"] },
    { id: "food", label: "Food Guide", icon: Apple, roles: ["all"] },
    { id: "meals", label: "Meal Planner", icon: Calendar, roles: ["all"] },
    { id: "growth", label: "Growth Monitor", icon: TrendingUp, roles: ["all"] },
    { id: "health-worker", label: "Patient Management", icon: Users, roles: ["health-worker", "admin"] },
    { id: "education", label: "Learning Hub", icon: BookOpen, roles: ["all"] },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => item.roles.includes("all") || item.roles.includes(userRole)
  );

  const renderContent = () => {
    switch (activeTab) {
      case "home": return <DashboardHome userRole={userRole} />;
      case "screening": return <MalnutritionScreening />;
      case "food": return <FoodRecommendations />;
      case "meals": return <MealPlanner />;
      case "growth": return <GrowthMonitoring />;
      case "health-worker": return <HealthWorkerTools />;
      case "education": return <EducationHub />;
      case "profile": return <ProfileManager />;
      default: return <DashboardHome userRole={userRole} />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h1>NutriCare</h1>
          <Button onClick={() => setSidebarOpen(false)}><X /></Button>
        </div>

        <nav className="menu">
          {filteredMenuItems.map((item) => (
            <Button
              key={item.id}
              className={`menu-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
            >
              <item.icon className="menu-icon" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Button onClick={onLogout}>Logout</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="top-bar">
          {!sidebarOpen && (
            <Button onClick={() => setSidebarOpen(true)}><Menu /></Button>
          )}
          <div className="spacer" />
          <Button><Bell /></Button>
        </div>

        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function DashboardHome({ userRole }) {
  const alerts = [
    { type: "warning", message: "Upcoming health checkup in 3 days", date: "Jan 16, 2026" },
    { type: "info", message: "New meal plan available", date: "Today" },
  ];

  return (
    <div className="dashboard-home">
      <h2>Welcome Back!</h2>
      <p>Here's your nutrition overview for today</p>

      <div className="quick-stats">
        <Card>
          <CardHeader>
            <CardDescription>Current Status</CardDescription>
            <CardTitle>Normal</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No immediate concerns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Weekly Progress</CardDescription>
            <CardTitle>+0.3 kg</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={65} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Meals Logged</CardDescription>
            <CardTitle>18/21</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Next Checkup</CardDescription>
            <CardTitle>3 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Jan 16, 2026</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts & Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {alerts.map((alert, i) => (
            <div key={i} className={`alert ${alert.type}`}>
              {alert.type === "warning" ? <AlertCircle /> : <CheckCircle />}
              <div>
                <p>{alert.message}</p>
                <small>{alert.date}</small>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
