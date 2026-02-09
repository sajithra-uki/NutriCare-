import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Calendar, Download } from "lucide-react";
import Badge from "./ui/Badge";

export default function GrowthMonitoring() {
  const [timeRange, setTimeRange] = useState("6months");

  // Sample growth data
  const weightData = [
    { date: "Jul 2025", weight: 10.2, whoMin: 9.5, whoMax: 11.5 },
    { date: "Aug 2025", weight: 10.8, whoMin: 9.8, whoMax: 11.8 },
    { date: "Sep 2025", weight: 11.3, whoMin: 10.1, whoMax: 12.1 },
    { date: "Oct 2025", weight: 11.8, whoMin: 10.4, whoMax: 12.4 },
    { date: "Nov 2025", weight: 12.2, whoMin: 10.7, whoMax: 12.7 },
    { date: "Dec 2025", weight: 12.7, whoMin: 11.0, whoMax: 13.0 },
    { date: "Jan 2026", weight: 13.1, whoMin: 11.3, whoMax: 13.3 },
  ];

  const heightData = [
    { date: "Jul 2025", height: 76, whoMin: 73, whoMax: 79 },
    { date: "Aug 2025", height: 78, whoMin: 75, whoMax: 81 },
    { date: "Sep 2025", height: 80, whoMin: 77, whoMax: 83 },
    { date: "Oct 2025", height: 82, whoMin: 79, whoMax: 85 },
    { date: "Nov 2025", height: 84, whoMin: 81, whoMax: 87 },
    { date: "Dec 2025", height: 85, whoMin: 82, whoMax: 88 },
    { date: "Jan 2026", height: 87, whoMin: 84, whoMax: 90 },
  ];

  const muacData = [
    { date: "Jul 2025", muac: 12.8, threshold: 12.5 },
    { date: "Aug 2025", muac: 13.0, threshold: 12.5 },
    { date: "Sep 2025", muac: 13.3, threshold: 12.5 },
    { date: "Oct 2025", muac: 13.5, threshold: 12.5 },
    { date: "Nov 2025", muac: 13.7, threshold: 12.5 },
    { date: "Dec 2025", muac: 14.0, threshold: 12.5 },
    { date: "Jan 2026", muac: 14.2, threshold: 12.5 },
  ];

  const latestWeight = weightData[weightData.length - 1].weight;
  const previousWeight = weightData[weightData.length - 2].weight;
  const weightChange = ((latestWeight - previousWeight) / previousWeight * 100).toFixed(1);

  const latestHeight = heightData[heightData.length - 1].height;
  const previousHeight = heightData[heightData.length - 2].height;
  const heightChange = latestHeight - previousHeight;

  return (
    <div style={{ maxWidth: "1000px", margin: "auto" }}>
      <h2>Growth & Progress Monitoring</h2>
      <p>Track development with WHO growth standards</p>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Card>
          <CardHeader>
            <CardDescription>Current Weight</CardDescription>
            <CardTitle>{latestWeight} kg</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <TrendingUp /> +{weightChange}% this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Current Height</CardDescription>
            <CardTitle>{latestHeight} cm</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <TrendingUp /> +{heightChange} cm this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>MUAC</CardDescription>
            <CardTitle>{muacData[muacData.length - 1].muac} cm</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge>Normal Range</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Overall Status</CardDescription>
            <CardTitle>Improving</CardTitle>
          </CardHeader>
          <CardContent>On track with targets</CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="weight">
        <TabsList>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="height">Height</TabsTrigger>
          <TabsTrigger value="muac">MUAC</TabsTrigger>
        </TabsList>

        {/* Weight Chart */}
        <TabsContent value="weight">
          <Card>
            <CardHeader>
              <CardTitle>Weight-for-Age Chart</CardTitle>
              <CardDescription>Compared to WHO standards</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area dataKey="whoMax" stroke="none" fill="#dcfce7" />
                  <Area dataKey="whoMin" stroke="none" fill="#ffffff" />
                  <Line dataKey="weight" stroke="#16a34a" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Height Chart */}
        <TabsContent value="height">
          <Card>
            <CardHeader>
              <CardTitle>Height-for-Age Chart</CardTitle>
              <CardDescription>Linear growth progression</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={heightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area dataKey="whoMax" stroke="none" fill="#dbeafe" />
                  <Area dataKey="whoMin" stroke="none" fill="#ffffff" />
                  <Line dataKey="height" stroke="#2563eb" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MUAC Chart */}
        <TabsContent value="muac">
          <Card>
            <CardHeader>
              <CardTitle>MUAC Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={muacData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[11, 15]} />
                  <Tooltip />
                  <Legend />
                  <Line dataKey="threshold" stroke="#ef4444" strokeDasharray="5 5" dot={false} />
                  <Line dataKey="muac" stroke="#16a34a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
