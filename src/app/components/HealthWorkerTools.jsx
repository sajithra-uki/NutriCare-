import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import Badge from "./ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Users, Search, AlertCircle, CheckCircle, MapPin, 
  Calendar, FileText, TrendingUp, Phone 
} from "lucide-react";

export default function HealthWorkerTools() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = [
    { id: 1, name: 'Amara Johnson', age: '2y 4m', location: 'Village A', status: 'severe', muac: 11.2, weight: 9.8, lastVisit: 'Jan 10, 2026', nextVisit: 'Jan 17, 2026', caregiver: 'Mary Johnson', phone: '+123 456 7890', notes: 'Started RUTF treatment. Monitor daily.' },
    { id: 2, name: 'David Okon', age: '1y 8m', location: 'Village B', status: 'moderate', muac: 12.0, weight: 10.5, lastVisit: 'Jan 11, 2026', nextVisit: 'Jan 18, 2026', caregiver: 'Grace Okon', phone: '+123 456 7891', notes: 'Supplementary feeding program. Weekly checkup.' },
    { id: 3, name: 'Sarah Mensah', age: '3y 1m', location: 'Village A', status: 'improving', muac: 13.5, weight: 13.2, lastVisit: 'Jan 8, 2026', nextVisit: 'Jan 22, 2026', caregiver: 'Ruth Mensah', phone: '+123 456 7892', notes: 'Good progress. Continue current plan.' },
    { id: 4, name: 'Emmanuel Banda', age: '2y 9m', location: 'Village C', status: 'normal', muac: 14.1, weight: 12.8, lastVisit: 'Jan 5, 2026', nextVisit: 'Feb 5, 2026', caregiver: 'Jane Banda', phone: '+123 456 7893', notes: 'Routine monitoring. Doing well.' },
  ];

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColors = {
    severe: "red",
    moderate: "orange",
    improving: "blue",
    normal: "green"
  };

  const statusIcon = (status) => {
    if (status === 'severe' || status === 'moderate') return <AlertCircle />;
    return <CheckCircle />;
  };

  const stats = {
    total: patients.length,
    severe: patients.filter(p => p.status === 'severe').length,
    moderate: patients.filter(p => p.status === 'moderate').length,
    improving: patients.filter(p => p.status === 'improving').length,
  };

  return (
    <div className="health-worker-tools">
      <h2>Patient Management</h2>
      <p>Monitor and manage assigned patients</p>

      {/* Stats */}
      <div className="stats-grid">
        <Card>
          <CardContent>
            <Users /> Total Patients: {stats.total}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <AlertCircle /> Severe: {stats.severe}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <AlertCircle /> Moderate: {stats.moderate}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <TrendingUp /> Improving: {stats.improving}
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Patient List</TabsTrigger>
          <TabsTrigger value="visits">Field Visits</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
        </TabsList>

        {/* Patient List */}
        <TabsContent value="list">
          <div className="search-bar">
            <Search /> 
            <Input 
              placeholder="Search by name or location..." 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
            />
          </div>

          <div className="patient-grid">
            {filteredPatients.map(patient => (
              <Card key={patient.id} onClick={() => setSelectedPatient(patient)}>
                <CardHeader>
                  <CardTitle>{patient.name}</CardTitle>
                  <Badge color={statusColors[patient.status]}>
                    {statusIcon(patient.status)} {patient.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div>{patient.age}</div>
                  <div><MapPin /> {patient.location}</div>
                  <div>MUAC: {patient.muac} cm | Weight: {patient.weight} kg</div>
                  <div>Next Visit: {patient.nextVisit}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Patient Details */}
          {selectedPatient && (
            <Card>
              <CardHeader>
                <CardTitle>Patient Details: {selectedPatient.name}</CardTitle>
                <Button onClick={() => setSelectedPatient(null)}>Close</Button>
              </CardHeader>
              <CardContent>
                <div>Age: {selectedPatient.age}</div>
                <div>Location: {selectedPatient.location}</div>
                <div>Caregiver: {selectedPatient.caregiver}</div>
                <div>Phone: {selectedPatient.phone}</div>
                <div>Status: {selectedPatient.status}</div>
                <div>MUAC: {selectedPatient.muac}</div>
                <div>Weight: {selectedPatient.weight}</div>
                <div>Last Visit: {selectedPatient.lastVisit}</div>
                <div>Next Visit: {selectedPatient.nextVisit}</div>
                <div>Notes: {selectedPatient.notes}</div>

                <div className="actions">
                  <Button><Calendar /> Record Visit</Button>
                  <Button><Phone /> Contact</Button>
                  <Button><FileText /> View History</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Field Visits */}
        <TabsContent value="visits">
          <div>
            {patients.filter(p => p.status === 'severe' || p.status === 'moderate').map(p => (
              <Card key={p.id}>
                <CardContent>
                  <div>{p.name} - {p.location}</div>
                  <div>Status: {p.status} | Next Visit: {p.nextVisit}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button><Calendar /> Add Visit Record</Button>
        </TabsContent>

        {/* Referrals */}
        <TabsContent value="referrals">
          <Card>
            <CardHeader>
              <CardTitle>Patient Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div>
                  <strong>Amara Johnson</strong> - Severe Acute Malnutrition
                  <Badge color="red">Urgent</Badge>
                  <Button>Refer to Hospital</Button>
                </div>
                <div>
                  <strong>David Okon</strong> - Moderate Acute Malnutrition
                  <Badge color="orange">Monitor</Badge>
                  <Button>View Treatment Plan</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
