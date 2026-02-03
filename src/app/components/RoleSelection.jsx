import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { UserCircle, Stethoscope, Baby, Settings } from "lucide-react";

export function RoleSelection({ onSelectRole }) {
  const roles = [
    {
      id: 'caregiver',
      title: 'Parent/Caregiver',
      description: 'Manage nutrition for your child or family member',
      icon: Baby,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      id: 'health-worker',
      title: 'Health Worker',
      description: 'Monitor patients and provide professional care',
      icon: Stethoscope,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'community',
      title: 'Community Member',
      description: 'Learn about nutrition and help your community',
      icon: UserCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Manage programs and view organizational data',
      icon: Settings,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Your Role</h2>
          <p className="text-gray-600">Choose how you'll be using NutriCare</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {roles.map((role) => (
            <Card 
              key={role.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onSelectRole(role.id)}
            >
              <CardHeader>
                <div className={`inline-flex items-center justify-center w-12 h-12 ${role.bgColor} rounded-lg mb-3`}>
                  <role.icon className={`w-6 h-6 ${role.color}`} />
                </div>
                <CardTitle>{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
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
