import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Heart, Users, TrendingUp, Leaf } from "lucide-react";
import "../../styles/welcome.css"; // plain CSS file

export default function WelcomeScreen({ onGetStarted }) {
  return (
    <div className="welcome-container">
      <div className="welcome-wrapper">
        <div className="welcome-header">
          <div className="welcome-logo">
            <Heart className="welcome-heart-icon" />
          </div>
          <h1 className="welcome-title">NutriCare</h1>
          <p className="welcome-subtitle">
            Preventing, Detecting, and Managing Malnutrition
          </p>
        </div>

        <div className="welcome-cards">
          <Card>
            <CardHeader>
              <Users className="card-icon green" />
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
              <TrendingUp className="card-icon blue" />
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
              <Leaf className="card-icon green" />
              <CardTitle>Smart Nutrition</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get personalized meal plans and local food recommendations
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="welcome-action">
          <Button onClick={onGetStarted} className="start-button">
            Get Started
          </Button>
          <p className="welcome-note">
            For NGOs, Hospitals, Government Programs, and Communities
          </p>
        </div>
      </div>
    </div>
  );
}
