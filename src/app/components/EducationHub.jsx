import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { BookOpen, Video, AlertTriangle, Utensils, Baby, Heart } from "lucide-react";

export function EducationHub() {
  const articles = [
    {
      id: 1,
      title: 'Understanding Malnutrition in Children',
      category: 'basics',
      duration: '5 min read',
      description: 'Learn about the types of malnutrition and early warning signs',
      icon: Baby,
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Essential Nutrients for Growing Children',
      category: 'nutrition',
      duration: '7 min read',
      description: 'Complete guide to proteins, vitamins, and minerals',
      icon: Heart,
      difficulty: 'Beginner'
    },
    {
      id: 3,
      title: 'Preparing Fortified Porridge',
      category: 'cooking',
      duration: '10 min read',
      description: 'Step-by-step guide to making nutrient-rich porridge',
      icon: Utensils,
      difficulty: 'Intermediate'
    },
  ];

  const videos = [
    {
      id: 1,
      title: 'How to Measure MUAC Correctly',
      duration: '3:45',
      category: 'training',
      thumbnail: 'video'
    },
    {
      id: 2,
      title: 'Cooking Nutritious Meals on a Budget',
      duration: '8:20',
      category: 'cooking',
      thumbnail: 'video'
    },
    {
      id: 3,
      title: 'Recognizing Danger Signs in Children',
      duration: '5:15',
      category: 'health',
      thumbnail: 'video'
    },
  ];

  const myths = [
    {
      myth: 'Giving water to babies under 6 months helps with hydration',
      fact: 'Babies under 6 months should only receive breast milk. Water can interfere with nutrient absorption and may contain harmful bacteria.',
      category: 'infant-feeding'
    },
    {
      myth: 'Fat children are healthy children',
      fact: 'Overweight children can also suffer from malnutrition. Hidden hunger (micronutrient deficiency) can affect any child regardless of weight.',
      category: 'general'
    },
    {
      myth: 'Eggs cause allergies and should be avoided',
      fact: 'Eggs are an excellent source of protein and nutrients. Early introduction (after 6 months) may actually reduce allergy risk.',
      category: 'food-beliefs'
    },
    {
      myth: 'Traditional foods are not as nutritious as imported foods',
      fact: 'Local traditional foods like lentils, millet, and indigenous vegetables are highly nutritious and often more affordable.',
      category: 'food-beliefs'
    },
  ];

  const emergencyTips = [
    {
      situation: 'Flood/Heavy Rains',
      tips: [
        'Ensure clean drinking water - boil for at least 1 minute',
        'Prioritize high-energy foods: fortified biscuits, groundnut paste',
        'Continue breastfeeding for infants',
        'Watch for diarrhea - give ORS solution',
      ]
    },
    {
      situation: 'Drought/Food Shortage',
      tips: [
        'Focus on nutrient-dense foods: eggs, beans, groundnuts',
        'Use fortified foods when available',
        'Prepare smaller, more frequent meals',
        'Seek support from feeding programs',
      ]
    },
    {
      situation: 'Disease Outbreak',
      tips: [
        'Maintain good hygiene and handwashing',
        'Increase vitamin-rich foods to boost immunity',
        'Continue feeding during and after illness',
        'Monitor weight closely during recovery',
      ]
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Learning Hub</h2>
        <p className="text-gray-600">Educational resources and practical guidance</p>
      </div>

      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="myths">Myth Busters</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {articles.map(article => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-3 rounded-lg bg-blue-50">
                      <article.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <Badge variant="outline">{article.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{article.duration}</span>
                    <Button variant="outline" size="sm">Read Article</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle>Key Takeaways</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2" />
                  <span className="text-sm">Exclusive breastfeeding for first 6 months</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2" />
                  <span className="text-sm">Introduce diverse foods after 6 months</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2" />
                  <span className="text-sm">Monitor growth regularly using WHO standards</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2" />
                  <span className="text-sm">Local foods can be highly nutritious and affordable</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {videos.map(video => (
              <Card key={video.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                    <Video className="w-12 h-12 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">{video.title}</h4>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{video.category}</Badge>
                    <span className="text-sm text-gray-600">{video.duration}</span>
                  </div>
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    Watch Video
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cooking Tutorials</CardTitle>
              <CardDescription>Learn to prepare nutritious, low-cost meals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                      <Utensils className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Fortified Porridge (3 ways)</p>
                      <p className="text-sm text-gray-600">12:30 minutes</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Watch</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center">
                      <Utensils className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium">Bean & Vegetable Stew</p>
                      <p className="text-sm text-gray-600">8:15 minutes</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Watch</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                      <Utensils className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Egg Preparations for Children</p>
                      <p className="text-sm text-gray-600">6:45 minutes</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Watch</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="myths" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Nutrition Myths</CardTitle>
              <CardDescription>Separating fact from fiction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myths.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-red-900">MYTH:</p>
                        <p className="text-gray-700">{item.myth}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 pl-8">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div>
                        <p className="font-semibold text-green-900">FACT:</p>
                        <p className="text-gray-700">{item.fact}</p>
                      </div>
                    </div>
                    <div className="mt-2 pl-8">
                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <p className="text-sm text-blue-900">
                <strong>Important:</strong> Always consult with qualified healthcare providers and 
                nutritionists. Cultural practices should be respected while ensuring child safety and nutrition.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Nutrition Guidelines</CardTitle>
              <CardDescription>What to do during crisis situations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyTips.map((emergency, index) => (
                  <div key={index} className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded">
                    <h4 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      {emergency.situation}
                    </h4>
                    <ul className="space-y-2">
                      {emergency.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-orange-900">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-900">When to Seek Immediate Help</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-red-900">Severe diarrhea or vomiting (signs of dehydration)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-red-900">Visible bilateral edema (swelling of feet/hands)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-red-900">MUAC less than 11.5cm (severe malnutrition)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-red-900">Child is lethargic or unable to eat</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
