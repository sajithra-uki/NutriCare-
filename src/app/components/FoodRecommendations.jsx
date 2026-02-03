import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Apple, Leaf, DollarSign, Heart, Search, Star } from "lucide-react";

export function FoodRecommendations() {
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
      'very-low': 'bg-green-100 text-green-800',
      'low': 'bg-blue-100 text-blue-800',
      'medium': 'bg-orange-100 text-orange-800',
      'high': 'bg-red-100 text-red-800'
    };
    return colors[cost] || colors['medium'];
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Food & Nutrition Guide</h2>
        <p className="text-gray-600">Recommended foods based on nutritional needs and local availability</p>
      </div>

      <Tabs defaultValue="recommended" className="space-y-6">
        <TabsList>
          <TabsTrigger value="recommended">Recommended Foods</TabsTrigger>
          <TabsTrigger value="therapeutic">Therapeutic Foods</TabsTrigger>
          <TabsTrigger value="substitutions">Substitution Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search foods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(cat => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Food Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredFoods.map(food => (
              <Card key={food.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{food.name}</CardTitle>
                      <CardDescription>{food.description}</CardDescription>
                    </div>
                    <Apple className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge className={getCostBadge(food.cost)}>
                      {food.cost.replace('-', ' ')} cost
                    </Badge>
                    <Badge variant="outline">{food.ageGroup}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-1">Benefits:</p>
                    <div className="flex flex-wrap gap-1">
                      {food.benefits.map((benefit, idx) => (
                        <span key={idx} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Local Alternatives:</p>
                    <p className="text-sm text-gray-600">{food.localAlternatives.join(', ')}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                    <div>
                      <p className="text-xs text-gray-500">Calories</p>
                      <p className="font-semibold">{food.nutrients.calories}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Protein</p>
                      <p className="font-semibold">{food.nutrients.protein}g</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Iron</p>
                      <p className="font-semibold">{food.nutrients.iron}mg</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" size="sm">
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="therapeutic" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {therapeuticFoods.map((food, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{food.name}</CardTitle>
                    <Heart className="w-5 h-5 text-red-500" />
                  </div>
                  <Badge variant="outline">{food.use}</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700">{food.description}</p>
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium text-gray-900">Availability:</p>
                    <p className="text-sm text-gray-600">{food.availability}</p>
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    Request Supply
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="substitutions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Food Substitution Engine</CardTitle>
              <CardDescription>
                Find alternatives when recommended foods are unavailable
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold">If unavailable:</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium">Eggs</p>
                      <p className="text-sm text-gray-600">→ Fish, milk, beans, or lentils</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium">Orange Sweet Potato</p>
                      <p className="text-sm text-gray-600">→ Carrots, pumpkin, mango, or papaya</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium">Milk</p>
                      <p className="text-sm text-gray-600">→ Yogurt, soy milk, or fortified plant milk</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Nutrient-based alternatives:</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-green-900">For Iron:</p>
                      <p className="text-sm text-green-700">Dark leafy greens, lentils, fortified cereals, liver</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="font-medium text-orange-900">For Vitamin A:</p>
                      <p className="text-sm text-orange-700">Orange vegetables, dark greens, liver, red palm oil</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-900">For Protein:</p>
                      <p className="text-sm text-blue-700">Beans, lentils, groundnuts, fish, eggs, meat</p>
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
