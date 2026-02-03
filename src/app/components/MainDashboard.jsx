import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { 
  Home, User, Activity, Apple, BookOpen, TrendingUp, 
  Users, Bell, Menu, X, Calendar, AlertCircle, CheckCircle
} from "lucide-react";
import { MalnutritionScreening } from "./MalnutritionScreening";
import { FoodRecommendations } from "./FoodRecommendations";
import { MealPlanner } from "./MealPlanner";
import { GrowthMonitoring } from "./GrowthMonitoring";
import { HealthWorkerTools } from "./HealthWorkerTools";
import { EducationHub } from "./EducationHub";
import { ProfileManager } from "./ProfileManager";

export function MainDashboard({ userRole, onLogout }) {
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isHealthWorker = userRole === 'health-worker' || userRole === 'admin';

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <DashboardHome userRole={userRole} />;
      case "screening":
        return <MalnutritionScreening />;
      case "food":
        return <FoodRecommendations />;
      case "meals":
        return <MealPlanner />;
      case "growth":
        return <GrowthMonitoring />;
      case "health-worker":
        return <HealthWorkerTools />;
      case "education":
        return <EducationHub />;
      case "profile":
        return <ProfileManager />;
      default:
        return <DashboardHome userRole={userRole} />;
    }
  };

  const menuItems = [
    { id: "home", label: "Dashboard", icon: Home, roles: ['all'] },
    { id: "profile", label: "Profile", icon: User, roles: ['all'] },
    { id: "screening", label: "Health Screening", icon: Activity, roles: ['all'] },
    { id: "food", label: "Food Guide", icon: Apple, roles: ['all'] },
    { id: "meals", label: "Meal Planner", icon: Calendar, roles: ['all'] },
    { id: "growth", label: "Growth Monitor", icon: TrendingUp, roles: ['all'] },
    { id: "health-worker", label: "Patient Management", icon: Users, roles: ['health-worker', 'admin'] },
    { id: "education", label: "Learning Hub", icon: BookOpen, roles: ['all'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes('all') || item.roles.includes(userRole)
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r transition-all duration-300 overflow-hidden`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-green-600">NutriCare</h1>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="md:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <nav className="space-y-2">
            {filteredMenuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === item.id ? 'bg-green-600 text-white' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t">
            <Button variant="outline" className="w-full" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b p-4 flex items-center justify-between">
          {!sidebarOpen && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
          <div className="flex-1" />
          <Button variant="ghost" size="sm">
            <Bell className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function DashboardHome({ userRole }) {
  const alerts = [
    { type: 'warning', message: 'Upcoming health checkup in 3 days', date: 'Jan 16, 2026' },
    { type: 'info', message: 'New meal plan available', date: 'Today' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
        <p className="text-gray-600">Here's your nutrition overview for today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Status</CardDescription>
            <CardTitle className="text-2xl text-green-600">Normal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">No immediate concerns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Weekly Progress</CardDescription>
            <CardTitle className="text-2xl">+0.3 kg</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={65} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Meals Logged</CardDescription>
            <CardTitle className="text-2xl">18/21</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Next Checkup</CardDescription>
            <CardTitle className="text-2xl">3 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Jan 16, 2026</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts & Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                {alert.type === 'warning' ? (
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Meal Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Meal Plan</CardTitle>
          <CardDescription>Tuesday, January 13, 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium">Breakfast</p>
                <p className="text-sm text-gray-600">Fortified porridge with banana</p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium">Lunch</p>
                <p className="text-sm text-gray-600">Rice, lentils, and vegetable curry</p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Dinner</p>
                <p className="text-sm text-gray-600">Fish, sweet potato, and greens</p>
              </div>
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
