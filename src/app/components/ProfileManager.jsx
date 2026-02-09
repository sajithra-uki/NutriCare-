import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { User, Baby, Edit, Plus } from "lucide-react";
import Badge from "./ui/Badge";

import '../../styles/profile.css' // plain CSS

export default function ProfileManager() {
  const [editMode, setEditMode] = useState(false);
  const [children, setChildren] = useState([
    {
      id: 1,
      name: "Sarah Smith",
      age: "2 years 3 months",
      gender: "Female",
      weight: 13.1,
      height: 87,
      muac: 14.2,
      status: "Normal",
    },
  ]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile Management</h2>
        <p>Manage your personal and child health information</p>
      </div>

      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal Profile</TabsTrigger>
          <TabsTrigger value="children">Children Profiles</TabsTrigger>
          <TabsTrigger value="medical">Medical History</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <div className="card-header-top">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your basic profile details</CardDescription>
                </div>
                <Button onClick={() => setEditMode(!editMode)}>
                  <Edit /> {editMode ? "Cancel" : "Edit"}
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="form-grid">
                <div>
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input id="fullname" defaultValue="Jane Smith" disabled={!editMode} />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" defaultValue="28" disabled={!editMode} />
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+123 456 7890" disabled={!editMode} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="jane.smith@email.com" disabled={!editMode} />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue="Village A, District 1" disabled={!editMode} />
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

              {editMode && <Button className="full-width">Save Changes</Button>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="children">
          <div className="add-child">
            <Button>
              <Plus /> Add Child Profile
            </Button>
          </div>

          {children.map((child) => (
            <Card key={child.id}>
              <CardHeader>
                <div className="child-card-header">
                  <div className="child-info">
                    <div className="child-icon">
                      <Baby />
                    </div>
                    <div>
                      <CardTitle>{child.name}</CardTitle>
                      <CardDescription>
                        {child.age} • {child.gender}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge>{child.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="form-grid-3">
                  <div>
                    <Label>Weight (kg)</Label>
                    <Input type="number" defaultValue={child.weight} />
                  </div>
                  <div>
                    <Label>Height (cm)</Label>
                    <Input type="number" defaultValue={child.height} />
                  </div>
                  <div>
                    <Label>MUAC (cm)</Label>
                    <Input type="number" defaultValue={child.muac} />
                  </div>
                </div>

                <div>
                  <Label>Date of Birth</Label>
                  <Input type="date" defaultValue="2023-10-10" />
                </div>

                <div>
                  <Label>Birth Weight (kg)</Label>
                  <Input type="number" placeholder="e.g., 3.2" />
                </div>

                <div>
                  <Label>Feeding Method</Label>
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

                <div className="child-buttons">
                  <Button>View Growth Chart</Button>
                  <Button>Update Measurements</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
              <CardDescription>Track health conditions and allergies</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label>Known Allergies</Label>
                <Textarea placeholder="List any food or medication allergies..." rows={3} />
              </div>

              <div>
                <Label>Existing Health Conditions</Label>
                <Textarea placeholder="List any chronic conditions or ongoing health issues..." rows={3} />
              </div>

              <div>
                <Label>Current Medications</Label>
                <Textarea placeholder="List any medications or supplements currently being taken..." rows={3} />
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
                <Label>Recent Illnesses (Past 6 months)</Label>
                <Textarea placeholder="Describe any recent illnesses, hospitalizations, or significant health events..." rows={4} />
              </div>

              <Button className="full-width">Save Medical Information</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <p>
                <strong>Privacy Notice:</strong> Your medical information is kept confidential and is only used to provide better nutrition recommendations and care.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
