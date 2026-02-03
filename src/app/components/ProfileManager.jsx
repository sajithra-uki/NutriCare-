import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { User, Baby, Edit, Plus } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";

export function ProfileManager() {
  const [editMode, setEditMode] = useState(false);
  const [children, setChildren] = useState([
    {
      id: 1,
      name: 'Sarah Smith',
      age: '2 years 3 months',
      gender: 'Female',
      weight: 13.1,
      height: 87,
      muac: 14.2,
      status: 'Normal'
    }
  ]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Management</h2>
        <p className="text-gray-600">Manage your personal and child health information</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Personal Profile</TabsTrigger>
          <TabsTrigger value="children">Children Profiles</TabsTrigger>
          <TabsTrigger value="medical">Medical History</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your basic profile details</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setEditMode(!editMode)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {editMode ? 'Cancel' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input 
                    id="fullname" 
                    defaultValue="Jane Smith" 
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    defaultValue="28" 
                    type="number"
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    defaultValue="+123 456 7890" 
                    disabled={!editMode}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    defaultValue="jane.smith@email.com" 
                    type="email"
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  defaultValue="Village A, District 1" 
                  disabled={!editMode}
                />
              </div>

              <div>
                <Label htmlFor="language">Preferred Language</Label>
                <Select disabled={!editMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="English" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="sw">Swahili</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="ha">Hausa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {editMode && (
                <Button className="w-full">Save Changes</Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Socioeconomic Information</CardTitle>
              <CardDescription>Optional - helps us provide better recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="income">Household Income Level</Label>
                <Select disabled={!editMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select income level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low income</SelectItem>
                    <SelectItem value="medium">Medium income</SelectItem>
                    <SelectItem value="high">Higher income</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="water">Primary Water Source</Label>
                <Select disabled={!editMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select water source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tap">Tap water</SelectItem>
                    <SelectItem value="well">Well/Borehole</SelectItem>
                    <SelectItem value="river">River/Stream</SelectItem>
                    <SelectItem value="vendor">Water vendor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="food-access">Food Access</Label>
                <Select disabled={!editMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select food access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular access to food</SelectItem>
                    <SelectItem value="limited">Limited access</SelectItem>
                    <SelectItem value="difficult">Difficult to access food</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="children" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Child Profile
            </Button>
          </div>

          {children.map(child => (
            <Card key={child.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                      <Baby className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <CardTitle>{child.name}</CardTitle>
                      <CardDescription>{child.age} • {child.gender}</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{child.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`weight-${child.id}`}>Current Weight (kg)</Label>
                    <Input 
                      id={`weight-${child.id}`}
                      type="number"
                      step="0.1"
                      defaultValue={child.weight}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`height-${child.id}`}>Current Height (cm)</Label>
                    <Input 
                      id={`height-${child.id}`}
                      type="number"
                      step="0.1"
                      defaultValue={child.height}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`muac-${child.id}`}>MUAC (cm)</Label>
                    <Input 
                      id={`muac-${child.id}`}
                      type="number"
                      step="0.1"
                      defaultValue={child.muac}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`dob-${child.id}`}>Date of Birth</Label>
                  <Input 
                    id={`dob-${child.id}`}
                    type="date"
                    defaultValue="2023-10-10"
                  />
                </div>

                <div>
                  <Label htmlFor={`birth-weight-${child.id}`}>Birth Weight (kg)</Label>
                  <Input 
                    id={`birth-weight-${child.id}`}
                    type="number"
                    step="0.1"
                    placeholder="e.g., 3.2"
                  />
                </div>

                <div>
                  <Label htmlFor={`feeding-${child.id}`}>Current Feeding Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select feeding method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exclusive-bf">Exclusive breastfeeding</SelectItem>
                      <SelectItem value="mixed">Mixed feeding</SelectItem>
                      <SelectItem value="formula">Formula feeding</SelectItem>
                      <SelectItem value="complementary">Complementary feeding</SelectItem>
                      <SelectItem value="family-foods">Family foods</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    View Growth Chart
                  </Button>
                  <Button className="flex-1">
                    Update Measurements
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="medical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
              <CardDescription>Track health conditions and allergies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="allergies">Known Allergies</Label>
                <Textarea 
                  id="allergies"
                  placeholder="List any food or medication allergies..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="conditions">Existing Health Conditions</Label>
                <Textarea 
                  id="conditions"
                  placeholder="List any chronic conditions or ongoing health issues..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea 
                  id="medications"
                  placeholder="List any medications or supplements currently being taken..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Immunization Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select immunization status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="up-to-date">Up to date</SelectItem>
                    <SelectItem value="partial">Partially completed</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="recent-illness">Recent Illnesses (Past 6 months)</Label>
                <Textarea 
                  id="recent-illness"
                  placeholder="Describe any recent illnesses, hospitalizations, or significant health events..."
                  rows={4}
                />
              </div>

              <Button className="w-full">Save Medical Information</Button>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <p className="text-sm text-blue-900">
                <strong>Privacy Notice:</strong> Your medical information is kept confidential and 
                is only used to provide better nutrition recommendations and care.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
