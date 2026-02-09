import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { UserCircle, Stethoscope, Baby, Settings } from "lucide-react";
import "../../styles/roles.css"; // import the plain CSS

export default function RoleSelection({ onSelectRole }) {
  const roles = [
    {
      id: "caregiver",
      title: "Parent/Caregiver",
      description: "Manage nutrition for your child or family member",
      icon: Baby,
      colorClass: "role-icon-pink",
      bgClass: "role-bg-pink",
    },
    {
      id: "health-worker",
      title: "Health Worker",
      description: "Monitor patients and provide professional care",
      icon: Stethoscope,
      colorClass: "role-icon-blue",
      bgClass: "role-bg-blue",
    },
    {
      id: "community",
      title: "Community Member",
      description: "Learn about nutrition and help your community",
      icon: UserCircle,
      colorClass: "role-icon-green",
      bgClass: "role-bg-green",
    },
    {
      id: "admin",
      title: "Administrator",
      description: "Manage programs and view organizational data",
      icon: Settings,
      colorClass: "role-icon-purple",
      bgClass: "role-bg-purple",
    },
  ];

  return (
    <div className="role-selection-container">
      <div className="role-selection-wrapper">
        <div className="role-selection-header">
          <h2>Select Your Role</h2>
          <p>Choose how you'll be using NutriCare</p>
        </div>

        <div className="role-grid">
          {roles.map((role) => (
            <Card
              key={role.id}
              className="role-card"
              onClick={() => onSelectRole(role.id)}
            >
              <CardHeader>
                <div className={`role-icon-wrapper ${role.bgClass}`}>
                  <role.icon className={`role-icon ${role.colorClass}`} />
                </div>
                <CardTitle>{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="role-button">
                  Continue as {role.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
