import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { 
  Users, Search, AlertCircle, CheckCircle, MapPin, 
  Calendar, FileText, TrendingUp, Phone 
} from "lucide-react";

export function HealthWorkerTools() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = [
    {
      id: 1,
      name: 'Amara Johnson',
      age: '2 years 4 months',
      location: 'Village A, District 1',
      status: 'severe',
      muac: 11.2,
      weight: 9.8,
      lastVisit: 'Jan 10, 2026',
      nextVisit: 'Jan 17, 2026',
      caregiver: 'Mary Johnson',
      phone: '+123 456 7890',
      notes: 'Started RUTF treatment. Monitor daily.'
    },
    {
      id: 2,
      name: 'David Okon',
      age: '1 year 8 months',
      location: 'Village B, District 1',
      status: 'moderate',
      muac: 12.0,
      weight: 10.5,
      lastVisit: 'Jan 11, 2026',
      nextVisit: 'Jan 18, 2026',
      caregiver: 'Grace Okon',
      phone: '+123 456 7891',
      notes: 'Supplementary feeding program. Weekly checkup.'
    },
    {
      id: 3,
      name: 'Sarah Mensah',
      age: '3 years 1 month',
      location: 'Village A, District 1',
      status: 'improving',
      muac: 13.5,
      weight: 13.2,
      lastVisit: 'Jan 8, 2026',
      nextVisit: 'Jan 22, 2026',
      caregiver: 'Ruth Mensah',
      phone: '+123 456 7892',
      notes: 'Good progress. Continue current plan.'
    },
    {
      id: 4,
      name: 'Emmanuel Banda',
      age: '2 years 9 months',
      location: 'Village C, District 2',
      status: 'normal',
      muac: 14.1,
      weight: 12.8,
      lastVisit: 'Jan 5, 2026',
      nextVisit: 'Feb 5, 2026',
      caregiver: 'Jane Banda',
      phone: '+123 456 7893',
      notes: 'Routine monitoring. Doing well.'
    },
  ];

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    const colors = {
      'severe': 'bg-red-100 text-red-800',
      'moderate': 'bg-orange-100 text-orange-800',
      'improving': 'bg-blue-100 text-blue-800',
      'normal': 'bg-green-100 text-green-800'
    };
    return colors[status] || colors['normal'];
  };

  const getStatusIcon = (status) => {
    if (status === 'severe' || status === 'moderate') {
      return <AlertCircle className="w-4 h-4" />;
    }
    return <CheckCircle className="w-4 h-4" />;
  };

  const stats = {
    total: patients.length,
    severe: patients.filter(p => p.status === 'severe').length,
    moderate: patients.filter(p => p.status === 'moderate').length,
    improving: patients.filter(p => p.status === 'improving').length,
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
        <p className="text-gray-600">Monitor and manage your assigned patients</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Severe (SAM)</p>
              <p className="text-2xl font-bold text-red-600">{stats.severe}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Moderate (MAM)</p>
              <p className="text-2xl font-bold text-orange-600">{stats.moderate}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Improving</p>
              <p className="text-2xl font-bold text-green-600">{stats.improving}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Patient List</TabsTrigger>
          <TabsTrigger value="visits">Field Visits</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search patients by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Patient List */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredPatients.map(patient => (
              <Card 
                key={patient.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedPatient(patient)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{patient.name}</CardTitle>
                      <CardDescription>{patient.age}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(patient.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(patient.status)}
                        {patient.status}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {patient.location}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                    <div>
                      <p className="text-xs text-gray-500">MUAC</p>
                      <p className="font-semibold">{patient.muac} cm</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Weight</p>
                      <p className="font-semibold">{patient.weight} kg</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t text-sm">
                    <span className="text-gray-600">Next visit:</span>
                    <span className="font-medium">{patient.nextVisit}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Patient Detail Modal (simplified) */}
          {selectedPatient && (
            <Card className="mt-4 border-2 border-blue-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Patient Details: {selectedPatient.name}</CardTitle>
                    <CardDescription>Full patient information and history</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedPatient(null)}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Basic Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Age:</span>
                        <span className="font-medium">{selectedPatient.age}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{selectedPatient.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Caregiver:</span>
                        <span className="font-medium">{selectedPatient.caregiver}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contact:</span>
                        <span className="font-medium">{selectedPatient.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Current Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge className={getStatusColor(selectedPatient.status)}>
                          {selectedPatient.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">MUAC:</span>
                        <span className="font-medium">{selectedPatient.muac} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weight:</span>
                        <span className="font-medium">{selectedPatient.weight} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Visit:</span>
                        <span className="font-medium">{selectedPatient.lastVisit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next Visit:</span>
                        <span className="font-medium">{selectedPatient.nextVisit}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Clinical Notes</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                    {selectedPatient.notes}
                  </p>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button className="flex-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Record Visit
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    View History
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="visits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Field Visits</CardTitle>
              <CardDescription>Schedule for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {patients
                  .filter(p => p.status === 'severe' || p.status === 'moderate')
                  .map(patient => (
                    <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-gray-600">{patient.location}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(patient.status)} variant="outline">
                          {patient.status}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{patient.nextVisit}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Record New Visit</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Add Visit Record
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Referrals</CardTitle>
              <CardDescription>Cases requiring specialized care</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-red-900">Amara Johnson</p>
                      <p className="text-sm text-red-700">Severe Acute Malnutrition (SAM)</p>
                    </div>
                    <Badge className="bg-red-600">Urgent</Badge>
                  </div>
                  <p className="text-sm text-red-800 mb-3">
                    Requires therapeutic feeding at nutrition center. MUAC: 11.2cm
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Refer to Hospital</Button>
                    <Button size="sm" variant="outline">Nutrition Center</Button>
                  </div>
                </div>

                <div className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-orange-900">David Okon</p>
                      <p className="text-sm text-orange-700">Moderate Acute Malnutrition (MAM)</p>
                    </div>
                    <Badge className="bg-orange-600">Monitor</Badge>
                  </div>
                  <p className="text-sm text-orange-800 mb-3">
                    Enrolled in supplementary feeding program. Weekly monitoring required.
                  </p>
                  <Button size="sm" variant="outline">View Treatment Plan</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
