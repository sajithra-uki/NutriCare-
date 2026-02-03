import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, Download } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";

export function GrowthMonitoring() {
  const [timeRange, setTimeRange] = useState('6months');

  // Sample growth data
  const weightData = [
    { date: 'Jul 2025', weight: 10.2, whoMin: 9.5, whoMax: 11.5 },
    { date: 'Aug 2025', weight: 10.8, whoMin: 9.8, whoMax: 11.8 },
    { date: 'Sep 2025', weight: 11.3, whoMin: 10.1, whoMax: 12.1 },
    { date: 'Oct 2025', weight: 11.8, whoMin: 10.4, whoMax: 12.4 },
    { date: 'Nov 2025', weight: 12.2, whoMin: 10.7, whoMax: 12.7 },
    { date: 'Dec 2025', weight: 12.7, whoMin: 11.0, whoMax: 13.0 },
    { date: 'Jan 2026', weight: 13.1, whoMin: 11.3, whoMax: 13.3 },
  ];

  const heightData = [
    { date: 'Jul 2025', height: 76, whoMin: 73, whoMax: 79 },
    { date: 'Aug 2025', height: 78, whoMin: 75, whoMax: 81 },
    { date: 'Sep 2025', height: 80, whoMin: 77, whoMax: 83 },
    { date: 'Oct 2025', height: 82, whoMin: 79, whoMax: 85 },
    { date: 'Nov 2025', height: 84, whoMin: 81, whoMax: 87 },
    { date: 'Dec 2025', height: 85, whoMin: 82, whoMax: 88 },
    { date: 'Jan 2026', height: 87, whoMin: 84, whoMax: 90 },
  ];

  const muacData = [
    { date: 'Jul 2025', muac: 12.8, threshold: 12.5 },
    { date: 'Aug 2025', muac: 13.0, threshold: 12.5 },
    { date: 'Sep 2025', muac: 13.3, threshold: 12.5 },
    { date: 'Oct 2025', muac: 13.5, threshold: 12.5 },
    { date: 'Nov 2025', muac: 13.7, threshold: 12.5 },
    { date: 'Dec 2025', muac: 14.0, threshold: 12.5 },
    { date: 'Jan 2026', muac: 14.2, threshold: 12.5 },
  ];

  const milestones = [
    { date: 'Jul 15, 2025', event: 'Started supplementary feeding', type: 'intervention', status: 'completed' },
    { date: 'Aug 20, 2025', event: 'Weight reached normal range', type: 'achievement', status: 'completed' },
    { date: 'Oct 10, 2025', event: 'Height improvement noted', type: 'achievement', status: 'completed' },
    { date: 'Jan 16, 2026', event: 'Scheduled health checkup', type: 'upcoming', status: 'pending' },
  ];

  const latestWeight = weightData[weightData.length - 1].weight;
  const previousWeight = weightData[weightData.length - 2].weight;
  const weightChange = ((latestWeight - previousWeight) / previousWeight * 100).toFixed(1);

  const latestHeight = heightData[heightData.length - 1].height;
  const previousHeight = heightData[heightData.length - 2].height;
  const heightChange = latestHeight - previousHeight;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Growth & Progress Monitoring</h2>
        <p className="text-gray-600">Track development with WHO growth standards</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Weight</CardDescription>
            <CardTitle className="text-2xl">{latestWeight} kg</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">+{weightChange}% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Height</CardDescription>
            <CardTitle className="text-2xl">{latestHeight} cm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">+{heightChange}cm this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>MUAC</CardDescription>
            <CardTitle className="text-2xl">{muacData[muacData.length - 1].muac} cm</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="bg-green-100 text-green-800">Normal Range</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Overall Status</CardDescription>
            <CardTitle className="text-2xl text-green-600">Improving</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">On track with targets</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="weight" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="height">Height</TabsTrigger>
            <TabsTrigger value="muac">MUAC</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <TabsContent value="weight" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weight-for-Age Chart</CardTitle>
              <CardDescription>Compared to WHO growth standards (green area = normal range)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="whoMax" 
                    stackId="1"
                    stroke="none" 
                    fill="#dcfce7" 
                    fillOpacity={0.3}
                    name="WHO Max"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="whoMin" 
                    stackId="2"
                    stroke="none" 
                    fill="#ffffff" 
                    fillOpacity={1}
                    name="WHO Min"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#16a34a" 
                    strokeWidth={3}
                    dot={{ fill: '#16a34a', r: 5 }}
                    name="Actual Weight"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analysis & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900">Positive Growth Trend</p>
                    <p className="text-sm text-green-700">
                      Weight has increased consistently over the past 6 months. Continue current nutrition plan.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Next Checkpoint</p>
                    <p className="text-sm text-blue-700">
                      Continue monitoring. Next weight check due in 2 weeks (Jan 27, 2026).
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="height" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Height-for-Age Chart</CardTitle>
              <CardDescription>Linear growth progression with WHO standards</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={heightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis label={{ value: 'Height (cm)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="whoMax" 
                    stackId="1"
                    stroke="none" 
                    fill="#dbeafe" 
                    fillOpacity={0.3}
                    name="WHO Max"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="whoMin" 
                    stackId="2"
                    stroke="none" 
                    fill="#ffffff" 
                    fillOpacity={1}
                    name="WHO Min"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="height" 
                    stroke="#2563eb" 
                    strokeWidth={3}
                    dot={{ fill: '#2563eb', r: 5 }}
                    name="Actual Height"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="muac" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>MUAC Trend</CardTitle>
              <CardDescription>Mid-Upper Arm Circumference (Red line = malnutrition threshold at 12.5cm)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={muacData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis 
                    label={{ value: 'MUAC (cm)', angle: -90, position: 'insideLeft' }}
                    domain={[11, 15]}
                  />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="threshold" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="MAM Threshold"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="muac" 
                    stroke="#16a34a" 
                    strokeWidth={3}
                    dot={{ fill: '#16a34a', r: 5 }}
                    name="Child's MUAC"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-red-700 font-bold">&lt;11.5</span>
                  </div>
                  <p className="font-semibold">Severe (SAM)</p>
                  <p className="text-sm text-gray-600">Immediate intervention</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-orange-700 font-bold">11.5-12.5</span>
                  </div>
                  <p className="font-semibold">Moderate (MAM)</p>
                  <p className="text-sm text-gray-600">Supplementary feeding</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-green-700 font-bold">&gt;12.5</span>
                  </div>
                  <p className="font-semibold">Normal</p>
                  <p className="text-sm text-gray-600">Current status</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recovery & Progress Timeline</CardTitle>
              <CardDescription>Key events and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      milestone.status === 'completed' ? 'bg-green-500' : 
                      milestone.status === 'pending' ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                    <div className="flex-1 pb-4 border-b last:border-b-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium">{milestone.event}</p>
                        <Badge variant={
                          milestone.type === 'achievement' ? 'default' : 
                          milestone.type === 'intervention' ? 'secondary' : 'outline'
                        }>
                          {milestone.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{milestone.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Before & After Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-3">July 2025 (Start)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Weight:</span>
                      <span className="font-medium">10.2 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Height:</span>
                      <span className="font-medium">76 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">MUAC:</span>
                      <span className="font-medium">12.8 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Status:</span>
                      <Badge variant="destructive" className="text-xs">At Risk</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">January 2026 (Current)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Weight:</span>
                      <span className="font-medium">13.1 kg (+2.9 kg)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Height:</span>
                      <span className="font-medium">87 cm (+11 cm)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">MUAC:</span>
                      <span className="font-medium">14.2 cm (+1.4 cm)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Status:</span>
                      <Badge className="bg-green-600 text-xs">Normal</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
