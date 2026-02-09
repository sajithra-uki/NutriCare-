import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Badge from "./ui/Badge";
import { Button } from "./ui/button";
import { BookOpen, Video, AlertTriangle, Utensils, Baby, Heart } from "lucide-react";

export default function EducationHub() {
  const articles = [
    { id: 1, title: 'Understanding Malnutrition in Children', category: 'basics', duration: '5 min read', description: 'Learn about the types of malnutrition and early warning signs', icon: Baby, difficulty: 'Beginner' },
    { id: 2, title: 'Essential Nutrients for Growing Children', category: 'nutrition', duration: '7 min read', description: 'Complete guide to proteins, vitamins, and minerals', icon: Heart, difficulty: 'Beginner' },
    { id: 3, title: 'Preparing Fortified Porridge', category: 'cooking', duration: '10 min read', description: 'Step-by-step guide to making nutrient-rich porridge', icon: Utensils, difficulty: 'Intermediate' },
  ];

  const videos = [
    { id: 1, title: 'How to Measure MUAC Correctly', duration: '3:45', category: 'training' },
    { id: 2, title: 'Cooking Nutritious Meals on a Budget', duration: '8:20', category: 'cooking' },
    { id: 3, title: 'Recognizing Danger Signs in Children', duration: '5:15', category: 'health' },
  ];

  const myths = [
    { myth: 'Giving water to babies under 6 months helps with hydration', fact: 'Babies under 6 months should only receive breast milk. Water can interfere with nutrient absorption.', category: 'infant-feeding' },
    { myth: 'Fat children are healthy children', fact: 'Overweight children can also suffer from malnutrition.', category: 'general' },
    { myth: 'Eggs cause allergies and should be avoided', fact: 'Eggs are an excellent source of protein. Early introduction may reduce allergy risk.', category: 'food-beliefs' },
    { myth: 'Traditional foods are not as nutritious as imported foods', fact: 'Local traditional foods like lentils, millet, and vegetables are highly nutritious.', category: 'food-beliefs' },
  ];

  const emergencyTips = [
    { situation: 'Flood/Heavy Rains', tips: ['Boil drinking water', 'Prioritize high-energy foods', 'Continue breastfeeding', 'Watch for diarrhea and give ORS'] },
    { situation: 'Drought/Food Shortage', tips: ['Focus on nutrient-dense foods', 'Use fortified foods', 'Prepare smaller meals', 'Seek support from feeding programs'] },
    { situation: 'Disease Outbreak', tips: ['Maintain hygiene', 'Increase vitamin-rich foods', 'Continue feeding', 'Monitor weight'] },
  ];

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>Learning Hub</h2>
      <p style={{ color: '#555' }}>Educational resources and practical guidance</p>

      <Tabs defaultValue="articles">
        <TabsList>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="myths">Myth Busters</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Tips</TabsTrigger>
        </TabsList>

        {/* Articles */}
        <TabsContent value="articles">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            {articles.map(article => (
              <Card key={article.id}>
                <CardHeader>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#dbeafe' }}>
                      <article.icon />
                    </div>
                    <Badge>{article.difficulty}</Badge>
                  </div>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                  <span>{article.duration}</span>
                  <Button size="sm">Read Article</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Videos */}
        <TabsContent value="videos">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginTop: '15px' }}>
            {videos.map(video => (
              <Card key={video.id}>
                <CardContent>
                  <div style={{ height: '120px', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                    <Video />
                  </div>
                  <p style={{ fontWeight: 'bold' }}>{video.title}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                    <Badge>{video.category}</Badge>
                    <span>{video.duration}</span>
                  </div>
                  <Button size="sm" style={{ width: '100%', marginTop: '10px' }}>Watch Video</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Myths */}
        <TabsContent value="myths">
          {myths.map((item, index) => (
            <Card key={index} style={{ marginTop: '10px' }}>
              <CardContent>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
                  <AlertTriangle style={{ color: 'red' }} />
                  <div>
                    <strong>MYTH:</strong> {item.myth}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', paddingLeft: '20px', marginBottom: '5px' }}>
                  <span style={{ color: 'green' }}>✓</span>
                  <div>
                    <strong>FACT:</strong> {item.fact}
                  </div>
                </div>
                <Badge>{item.category}</Badge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Emergency */}
        <TabsContent value="emergency">
          {emergencyTips.map((tip, i) => (
            <Card key={i} style={{ marginTop: '10px', borderLeft: '4px solid orange', backgroundColor: '#fff7ed', padding: '10px' }}>
              <CardTitle style={{ color: 'orange' }}>{tip.situation}</CardTitle>
              <ul>
                {tip.tips.map((t, idx) => (
                  <li key={idx} style={{ marginLeft: '10px', marginTop: '3px' }}>• {t}</li>
                ))}
              </ul>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
