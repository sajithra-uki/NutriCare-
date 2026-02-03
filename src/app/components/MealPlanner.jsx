import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Calendar, Check, Clock, Plus, Utensils } from "lucide-react";
import { Checkbox } from "@/app/components/ui/checkbox";

export function MealPlanner() {
  const [selectedDay, setSelectedDay] = useState('today');
  const [loggedMeals, setLoggedMeals] = useState(['breakfast-today', 'lunch-today']);

  const toggleMeal = (mealId) => {
    if (loggedMeals.includes(mealId)) {
      setLoggedMeals(loggedMeals.filter(id => id !== mealId));
    } else {
      setLoggedMeals([...loggedMeals, mealId]);
    }
  };

  const weekDays = [
    { id: 'today', label: 'Today', date: 'Jan 13' },
    { id: 'tomorrow', label: 'Tomorrow', date: 'Jan 14' },
    { id: 'day3', label: 'Thursday', date: 'Jan 15' },
    { id: 'day4', label: 'Friday', date: 'Jan 16' },
    { id: 'day5', label: 'Saturday', date: 'Jan 17' },
  ];

  const mealPlans = {
    today: {
      breakfast: {
        name: 'Fortified Porridge with Banana',
        time: '7:00 AM',
        calories: 350,
        portions: '1 cup porridge + 1 medium banana',
        nutrients: 'High in energy, iron, vitamin C',
        preparation: 'Cook porridge with milk, mash banana on top'
      },
      morningSnack: {
        name: 'Boiled Egg',
        time: '10:00 AM',
        calories: 155,
        portions: '1 egg',
        nutrients: 'Complete protein, vitamin B12',
        preparation: 'Boil for 10 minutes'
      },
      lunch: {
        name: 'Rice, Lentils & Vegetable Curry',
        time: '12:30 PM',
        calories: 450,
        portions: '1 cup rice + ½ cup lentils + vegetables',
        nutrients: 'Protein, iron, vitamins A & C',
        preparation: 'Cook lentils with tomatoes, serve with rice'
      },
      afternoonSnack: {
        name: 'Orange Sweet Potato',
        time: '3:00 PM',
        calories: 112,
        portions: '1 medium potato',
        nutrients: 'High vitamin A, energy',
        preparation: 'Boil or steam for 20 minutes'
      },
      dinner: {
        name: 'Fish with Greens & Ugali',
        time: '6:30 PM',
        calories: 420,
        portions: '100g fish + greens + 1 cup ugali',
        nutrients: 'Protein, omega-3, iron, calcium',
        preparation: 'Fry fish, cook greens, prepare ugali'
      }
    },
    tomorrow: {
      breakfast: {
        name: 'Scrambled Eggs with Whole Grain Toast',
        time: '7:00 AM',
        calories: 320,
        portions: '2 eggs + 2 slices bread',
        nutrients: 'Protein, B vitamins, fiber',
        preparation: 'Scramble eggs with a bit of oil'
      },
      morningSnack: {
        name: 'Groundnut Paste with Crackers',
        time: '10:00 AM',
        calories: 200,
        portions: '2 tbsp paste + crackers',
        nutrients: 'Healthy fats, protein, energy',
        preparation: 'Spread on crackers'
      },
      lunch: {
        name: 'Chicken Stew with Sweet Potato',
        time: '12:30 PM',
        calories: 480,
        portions: '100g chicken + 1 large sweet potato',
        nutrients: 'Protein, vitamin A, iron',
        preparation: 'Stew chicken with vegetables'
      },
      afternoonSnack: {
        name: 'Papaya Slices',
        time: '3:00 PM',
        calories: 55,
        portions: '1 cup sliced',
        nutrients: 'Vitamin C, digestive enzymes',
        preparation: 'Cut fresh papaya'
      },
      dinner: {
        name: 'Bean & Vegetable Stew with Rice',
        time: '6:30 PM',
        calories: 400,
        portions: '1 cup beans + vegetables + rice',
        nutrients: 'Protein, fiber, iron',
        preparation: 'Cook beans with tomatoes and vegetables'
      }
    }
  };

  const currentPlan = mealPlans[selectedDay] || mealPlans.today;
  const meals = Object.entries(currentPlan);

  const totalCalories = meals.reduce((sum, [_, meal]) => sum + meal.calories, 0);
  const loggedCount = meals.filter(([key, _]) => 
    loggedMeals.includes(`${key}-${selectedDay}`)
  ).length;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Meal Planner & Tracker</h2>
        <p className="text-gray-600">Plan and track daily meals for optimal nutrition</p>
      </div>

      {/* Week Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {weekDays.map(day => (
          <Button
            key={day.id}
            variant={selectedDay === day.id ? "default" : "outline"}
            onClick={() => setSelectedDay(day.id)}
            className="flex-shrink-0"
          >
            <div className="text-center">
              <div className="text-sm">{day.label}</div>
              <div className="text-xs opacity-75">{day.date}</div>
            </div>
          </Button>
        ))}
      </div>

      {/* Daily Summary */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Utensils className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Total Meals</p>
              <p className="text-2xl font-bold">{meals.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Check className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Logged</p>
              <p className="text-2xl font-bold">{loggedCount}/{meals.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Total Calories</p>
              <p className="text-2xl font-bold">{totalCalories}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Next Meal</p>
              <p className="text-2xl font-bold">2h 15m</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="plan" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plan">Meal Plan</TabsTrigger>
          <TabsTrigger value="portions">Portion Guide</TabsTrigger>
          <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
        </TabsList>

        <TabsContent value="plan" className="space-y-4">
          {meals.map(([mealType, meal]) => {
            const mealId = `${mealType}-${selectedDay}`;
            const isLogged = loggedMeals.includes(mealId);
            
            return (
              <Card key={mealType} className={isLogged ? 'bg-green-50 border-green-200' : ''}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={isLogged}
                          onCheckedChange={() => toggleMeal(mealId)}
                          id={mealId}
                        />
                        <div>
                          <CardTitle className="capitalize">
                            {mealType.replace(/([A-Z])/g, ' $1').trim()}
                          </CardTitle>
                          <CardDescription>{meal.name}</CardDescription>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{meal.time}</Badge>
                      <p className="text-sm text-gray-600 mt-1">{meal.calories} cal</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Portions:</p>
                      <p className="text-sm text-gray-600">{meal.portions}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Key Nutrients:</p>
                      <p className="text-sm text-gray-600">{meal.nutrients}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Preparation:</p>
                    <p className="text-sm text-gray-600">{meal.preparation}</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      View Recipe
                    </Button>
                    {!isLogged && (
                      <Button size="sm" onClick={() => toggleMeal(mealId)}>
                        Mark as Eaten
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <Button className="w-full" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Custom Meal
          </Button>
        </TabsContent>

        <TabsContent value="portions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visual Portion Guide</CardTitle>
              <CardDescription>Understanding proper serving sizes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">For Children (6-24 months):</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium">Grains/Cereals</p>
                      <p className="text-sm text-gray-600">½ - 1 cup per meal</p>
                      <p className="text-xs text-gray-500">Size of child's fist</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium">Protein Foods</p>
                      <p className="text-sm text-gray-600">2-3 tablespoons</p>
                      <p className="text-xs text-gray-500">Palm-sized portion</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium">Vegetables</p>
                      <p className="text-sm text-gray-600">2-4 tablespoons</p>
                      <p className="text-xs text-gray-500">Handful</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">For Adults:</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium">Grains/Starch</p>
                      <p className="text-sm text-gray-600">1 cup or fist-sized</p>
                      <p className="text-xs text-gray-500">Rice, ugali, pasta</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium">Protein</p>
                      <p className="text-sm text-gray-600">Palm-sized (100-150g)</p>
                      <p className="text-xs text-gray-500">Fish, meat, beans</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium">Vegetables</p>
                      <p className="text-sm text-gray-600">2 handfuls</p>
                      <p className="text-xs text-gray-500">½ of your plate</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alternatives" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meal Alternatives</CardTitle>
              <CardDescription>Substitute options if ingredients are unavailable</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-2">Instead of: Fortified Porridge</p>
                  <p className="text-sm text-gray-700">→ Oatmeal with milk and honey</p>
                  <p className="text-sm text-gray-700">→ Rice cereal with mashed banana</p>
                  <p className="text-sm text-gray-700">→ Wheat porridge with groundnut paste</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-2">Instead of: Fish with Greens</p>
                  <p className="text-sm text-gray-700">→ Beans with spinach</p>
                  <p className="text-sm text-gray-700">→ Chicken with kale</p>
                  <p className="text-sm text-gray-700">→ Eggs with moringa leaves</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-2">Instead of: Orange Sweet Potato</p>
                  <p className="text-sm text-gray-700">→ Carrots (boiled or mashed)</p>
                  <p className="text-sm text-gray-700">→ Pumpkin</p>
                  <p className="text-sm text-gray-700">→ Mango or papaya</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
