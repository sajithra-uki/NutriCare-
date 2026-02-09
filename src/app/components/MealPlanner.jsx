import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Badge  from "./ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar, Check, Clock, Plus, Utensils } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

import "../../styles/mealplanner.css"; // plain CSS

export  default function MealPlanner() {
  const [selectedDay, setSelectedDay] = useState("today");
  const [loggedMeals, setLoggedMeals] = useState(["breakfast-today", "lunch-today"]);

  const toggleMeal = (mealId) => {
    if (loggedMeals.includes(mealId)) {
      setLoggedMeals(loggedMeals.filter((id) => id !== mealId));
    } else {
      setLoggedMeals([...loggedMeals, mealId]);
    }
  };

  const weekDays = [
    { id: "today", label: "Today", date: "Jan 13" },
    { id: "tomorrow", label: "Tomorrow", date: "Jan 14" },
    { id: "day3", label: "Thursday", date: "Jan 15" },
    { id: "day4", label: "Friday", date: "Jan 16" },
    { id: "day5", label: "Saturday", date: "Jan 17" },
  ];

  const mealPlans = {
    today: {
      breakfast: {
        name: "Fortified Porridge with Banana",
        time: "7:00 AM",
        calories: 350,
        portions: "1 cup porridge + 1 medium banana",
        nutrients: "High in energy, iron, vitamin C",
        preparation: "Cook porridge with milk, mash banana on top",
      },
      lunch: {
        name: "Rice, Lentils & Vegetable Curry",
        time: "12:30 PM",
        calories: 450,
        portions: "1 cup rice + ½ cup lentils + vegetables",
        nutrients: "Protein, iron, vitamins A & C",
        preparation: "Cook lentils with tomatoes, serve with rice",
      },
    },
    tomorrow: {
      breakfast: {
        name: "Scrambled Eggs with Whole Grain Toast",
        time: "7:00 AM",
        calories: 320,
        portions: "2 eggs + 2 slices bread",
        nutrients: "Protein, B vitamins, fiber",
        preparation: "Scramble eggs with a bit of oil",
      },
      lunch: {
        name: "Chicken Stew with Sweet Potato",
        time: "12:30 PM",
        calories: 480,
        portions: "100g chicken + 1 large sweet potato",
        nutrients: "Protein, vitamin A, iron",
        preparation: "Stew chicken with vegetables",
      },
    },
  };

  const currentPlan = mealPlans[selectedDay] || mealPlans.today;
  const meals = Object.entries(currentPlan);
  const totalCalories = meals.reduce((sum, [_, meal]) => sum + meal.calories, 0);
  const loggedCount = meals.filter(([key]) => loggedMeals.includes(`${key}-${selectedDay}`)).length;

  return (
    <div className="mealplanner-container">
      <div className="header">
        <h2>Meal Planner & Tracker</h2>
        <p>Plan and track daily meals for optimal nutrition</p>
      </div>

      {/* Week Navigation */}
      <div className="week-navigation">
        {weekDays.map((day) => (
          <Button
            key={day.id}
            onClick={() => setSelectedDay(day.id)}
            className={selectedDay === day.id ? "active-day" : "inactive-day"}
          >
            <div className="day-label">
              <div>{day.label}</div>
              <div>{day.date}</div>
            </div>
          </Button>
        ))}
      </div>

      {/* Daily Summary */}
      <div className="daily-summary">
        <Card>
          <CardContent>
            <Utensils /> <p>Total Meals</p> <p>{meals.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Check /> <p>Logged</p> <p>{loggedCount}/{meals.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Calendar /> <p>Total Calories</p> <p>{totalCalories}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Clock /> <p>Next Meal</p> <p>2h 15m</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="plan">
        <TabsList>
          <TabsTrigger value="plan">Meal Plan</TabsTrigger>
          <TabsTrigger value="portions">Portion Guide</TabsTrigger>
          <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
        </TabsList>

        <TabsContent value="plan">
          {meals.map(([mealType, meal]) => {
            const mealId = `${mealType}-${selectedDay}`;
            const isLogged = loggedMeals.includes(mealId);

            return (
              <Card key={mealType} className={isLogged ? "meal-logged" : ""}>
                <CardHeader>
                  <div className="meal-header">
                    <Checkbox checked={isLogged} onCheckedChange={() => toggleMeal(mealId)} />
                    <div>
                      <CardTitle>{mealType}</CardTitle>
                      <CardDescription>{meal.name}</CardDescription>
                    </div>
                    <Badge>{meal.time}</Badge>
                    <p>{meal.calories} cal</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p><strong>Portions:</strong> {meal.portions}</p>
                  <p><strong>Nutrients:</strong> {meal.nutrients}</p>
                  <p><strong>Preparation:</strong> {meal.preparation}</p>
                  <div className="meal-buttons">
                    <Button>View Recipe</Button>
                    {!isLogged && <Button onClick={() => toggleMeal(mealId)}>Mark as Eaten</Button>}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <Button>
            <Plus /> Add Custom Meal
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
