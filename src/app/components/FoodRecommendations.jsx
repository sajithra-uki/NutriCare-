import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Badge from "./ui/Badge"; 
import { Input } from "./ui/input";
import { Apple, Heart, Search } from "lucide-react";

export default function FoodRecommendations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Foods' },
    { id: 'protein', name: 'Protein-Rich' },
    { id: 'iron', name: 'Iron Sources' },
    { id: 'vitamin-a', name: 'Vitamin A' },
    { id: 'energy', name: 'Energy Foods' },
  ];

  const foodRecommendations = [
    {
      id: 1,
      name: 'Fortified Porridge',
      category: 'energy',
      description: 'Maize/millet flour with milk powder, rich in calories and nutrients',
      benefits: ['High energy', 'Easy to digest', 'Fortified with vitamins'],
      localAlternatives: ['Rice porridge', 'Wheat cereal', 'Oat porridge'],
      cost: 'low',
      preparation: '15 minutes',
      ageGroup: '6+ months',
      nutrients: { calories: 350, protein: 12, iron: 4 }
    },
    {
      id: 2,
      name: 'Lentils & Beans',
      category: 'protein',
      description: 'Local pulses providing plant-based protein and iron',
      benefits: ['High protein', 'Rich in iron', 'Affordable'],
      localAlternatives: ['Chickpeas', 'Black beans', 'Green gram'],
      cost: 'low',
      preparation: '30 minutes',
      ageGroup: '8+ months',
      nutrients: { calories: 230, protein: 18, iron: 6 }
    },
    {
      id: 3,
      name: 'Dark Leafy Greens',
      category: 'iron',
      description: 'Spinach, moringa, amaranth - rich in iron and vitamins',
      benefits: ['Iron-rich', 'Vitamin A & C', 'Folate'],
      localAlternatives: ['Moringa leaves', 'Cassava leaves', 'Sweet potato leaves'],
      cost: 'very-low',
      preparation: '10 minutes',
      ageGroup: '6+ months',
      nutrients: { calories: 23, protein: 3, iron: 3 }
    },
    {
      id: 4,
      name: 'Sweet Potato (Orange)',
      category: 'vitamin-a',
      description: 'Excellent source of beta-carotene and energy',
      benefits: ['High Vitamin A', 'Energy-dense', 'Locally available'],
      localAlternatives: ['Carrots', 'Pumpkin', 'Mango'],
      cost: 'low',
      preparation: '20 minutes',
      ageGroup: '6+ months',
      nutrients: { calories: 112, protein: 2, iron: 1 }
    },
    {
      id: 5,
      name: 'Eggs',
      category: 'protein',
      description: 'Complete protein source with essential vitamins',
      benefits: ['Complete protein', 'Vitamin B12', 'Choline for brain'],
      localAlternatives: ['Fish', 'Chicken', 'Milk'],
      cost: 'medium',
      preparation: '10 minutes',
      ageGroup: '8+ months',
      nutrients: { calories: 155, protein: 13, iron: 2 }
    },
    {
      id: 6,
      name: 'Groundnut Paste',
      category: 'energy',
      description: 'High-energy paste used in ready-to-use foods',
      benefits: ['Very high energy', 'Healthy fats', 'Protein-rich'],
      localAlternatives: ['Sesame paste', 'Cashew butter', 'Sunflower paste'],
      cost: 'medium',
      preparation: '5 minutes',
      ageGroup: '12+ months',
      nutrients: { calories: 588, protein: 25, iron: 2 }
    },
  ];

  const therapeuticFoods = [
    {
      name: 'RUTF (Ready-to-Use Therapeutic Food)',
      use: 'Severe Acute Malnutrition',
      description: 'High-energy, nutrient-dense paste for SAM treatment',
      availability: 'Health centers, NGO programs'
    },
    {
      name: 'RUSF (Ready-to-Use Supplementary Food)',
      use: 'Moderate Acute Malnutrition',
      description: 'Fortified food supplement for MAM prevention',
      availability: 'Community health workers'
    },
    {
      name: 'Multiple Micronutrient Powder (MNP)',
      use: 'Micronutrient deficiency prevention',
      description: 'Sprinkle powder to add to meals',
      availability: 'Health centers, pharmacies'
    },
    {
      name: 'Iron-Folic Acid Supplements',
      use: 'Anemia in pregnancy and children',
      description: 'Tablets or syrup for iron deficiency',
      availability: 'Health centers, pharmacies'
    },
  ];

  const filteredFoods = foodRecommendations.filter(food => {
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          food.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCostBadge = (cost) => {
    const colors = {
      'very-low': 'green',
      'low': 'blue',
      'medium': 'orange',
      'high': 'red'
    };
    return colors[cost] || 'gray';
  };

  return (
    <div className="container">
      <h2>Food & Nutrition Guide</h2>
      <p>Recommended foods based on nutritional needs and local availability</p>

      <Tabs defaultValue="recommended">
        <TabsList>
          <TabsTrigger value="recommended">Recommended Foods</TabsTrigger>
          <TabsTrigger value="therapeutic">Therapeutic Foods</TabsTrigger>
          <TabsTrigger value="substitutions">Substitution Guide</TabsTrigger>
        </TabsList>

        {/* Recommended Foods */}
        <TabsContent value="recommended">
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '8px', top: '8px', color: '#888' }} />
              <Input 
                placeholder="Search foods..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                style={{ paddingLeft: '24px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              {categories.map(cat => (
                <Button 
                  key={cat.id} 
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{ backgroundColor: selectedCategory === cat.id ? '#ccc' : '#fff' }}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {filteredFoods.map(food => (
              <Card key={food.id}>
                <CardHeader>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <CardTitle>{food.name}</CardTitle>
                      <CardDescription>{food.description}</CardDescription>
                    </div>
                    <Apple />
                  </div>
                  <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                    <Badge style={{ backgroundColor: getCostBadge(food.cost) }}>{food.cost} cost</Badge>
                    <Badge>{food.ageGroup}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <p>Benefits:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {food.benefits.map((b, i) => <span key={i}>{b}</span>)}
                    </div>
                  </div>
                  <div>
                    <p>Local Alternatives: {food.localAlternatives.join(', ')}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                    <div>Calories: {food.nutrients.calories}</div>
                    <div>Protein: {food.nutrients.protein}g</div>
                    <div>Iron: {food.nutrients.iron}mg</div>
                  </div>
                  <Button>View Recipe</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Therapeutic Foods */}
        <TabsContent value="therapeutic">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {therapeuticFoods.map((food, i) => (
              <Card key={i}>
                <CardHeader>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <CardTitle>{food.name}</CardTitle>
                    <Heart />
                  </div>
                  <Badge>{food.use}</Badge>
                </CardHeader>
                <CardContent>
                  <p>{food.description}</p>
                  <p>Availability: {food.availability}</p>
                  <Button>Request Supply</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Substitutions */}
        <TabsContent value="substitutions">
          <Card>
            <CardHeader>
              <CardTitle>Food Substitution Engine</CardTitle>
              <CardDescription>Find alternatives when recommended foods are unavailable</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <h4>If unavailable:</h4>
                  <p>Eggs → Fish, milk, beans, or lentils</p>
                  <p>Orange Sweet Potato → Carrots, pumpkin, mango, or papaya</p>
                  <p>Milk → Yogurt, soy milk, or fortified plant milk</p>
                </div>
                <div>
                  <h4>Nutrient-based alternatives:</h4>
                  <p>Iron → Dark leafy greens, lentils, fortified cereals, liver</p>
                  <p>Vitamin A → Orange vegetables, dark greens, liver, red palm oil</p>
                  <p>Protein → Beans, lentils, groundnuts, fish, eggs, meat</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
