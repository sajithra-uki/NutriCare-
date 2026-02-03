import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Heart, Users, TrendingUp, Leaf } from "lucide-react";

export function WelcomeScreen({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">NutriCare</h1>
          <p className="text-xl text-gray-600">
            Preventing, Detecting, and Managing Malnutrition
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <Users className="w-8 h-8 text-green-600 mb-2" />
              <CardTitle>Community Care</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Support families, caregivers, and health workers in nutrition management
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle>Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor growth, recovery stages, and health improvements over time
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Leaf className="w-8 h-8 text-green-600 mb-2" />
              <CardTitle>Smart Nutrition</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get personalized meal plans and local food recommendations
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            onClick={onGetStarted} 
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
          >
            Get Started
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            For NGOs, Hospitals, Government Programs, and Communities
          </p>
        </div>
      </div>
    </div>
  );
}
