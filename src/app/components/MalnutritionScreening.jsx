import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

import "../../styles/malnutrition.css"; // plain CSS

export default function MalnutritionScreening() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    muac: "",
    gender: "male",
    edema: "no",
    appetite: "normal",
    recentIllness: "no",
  });
  const [result, setResult] = useState(null);

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const calculateMalnutrition = () => {
    const age = parseFloat(formData.age);
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const muac = parseFloat(formData.muac);

    const bmi = weight / ((height / 100) ** 2);
    let status = "Normal";
    let severity = "none";
    let color = "green";
    let recommendations = [];

    if (age >= 0.5 && age <= 5) {
      // MUAC-based screening for children
      if (muac < 11.5) {
        status = "Severe Acute Malnutrition (SAM)";
        severity = "severe";
        color = "red";
        recommendations = [
          "Immediate referral to health facility required",
          "Ready-to-Use Therapeutic Food (RUTF) recommended",
          "Daily monitoring needed",
          "Check for medical complications",
        ];
      } else if (muac < 12.5) {
        status = "Moderate Acute Malnutrition (MAM)";
        severity = "moderate";
        color = "orange";
        recommendations = [
          "Supplementary feeding program recommended",
          "Weekly monitoring required",
          "Nutritious food supplements needed",
          "Follow-up in 7 days",
        ];
      } else {
        status = "Normal Nutritional Status";
        color = "green";
        recommendations = [
          "Continue balanced diet",
          "Regular growth monitoring",
          "Promote exclusive breastfeeding (if under 6 months)",
          "Next checkup in 1 month",
        ];
      }
    } else {
      // BMI-based for adults
      if (bmi < 16) {
        status = "Severe Malnutrition";
        severity = "severe";
        color = "red";
        recommendations = [
          "Medical evaluation needed",
          "High-calorie diet plan",
          "Possible hospitalization",
          "Address underlying causes",
        ];
      } else if (bmi < 18.5) {
        status = "Moderate Malnutrition";
        severity = "moderate";
        color = "orange";
        recommendations = [
          "Increase caloric intake",
          "Nutrient-dense meals",
          "Weekly monitoring",
          "Nutritional counseling",
        ];
      } else if (bmi < 25) {
        status = "Normal";
        color = "green";
        recommendations = [
          "Maintain balanced diet",
          "Regular physical activity",
          "Routine health checkups",
          "Continue good habits",
        ];
      } else {
        status = "Overweight/Obese";
        severity = "moderate";
        color = "orange";
        recommendations = [
          "Balanced diet with portion control",
          "Increase physical activity",
          "Avoid processed foods",
          "Regular health monitoring",
        ];
      }
    }

    if (formData.edema === "yes") {
      severity = "severe";
      recommendations.unshift("Bilateral edema detected - immediate medical attention required");
    }

    setResult({
      status,
      severity,
      color,
      bmi: bmi.toFixed(1),
      recommendations,
      measurements: { age, weight, height, muac, bmi },
    });
  };

  const handleSubmit = () => {
    calculateMalnutrition();
    setStep(4);
  };

  return (
    <div className="malnutrition-container">
      <div className="header">
        <h2>Malnutrition Screening</h2>
        <p>WHO-based assessment tool</p>
      </div>

      <Progress value={(step / 4) * 100} />
      <p>Step {step} of 4</p>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Basic Information"}
            {step === 2 && "Anthropometric Measurements"}
            {step === 3 && "Clinical Assessment"}
            {step === 4 && "Assessment Results"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Enter basic demographic information"}
            {step === 2 && "Record weight, height, and MUAC"}
            {step === 3 && "Additional health indicators"}
            {step === 4 && "View screening results and recommendations"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Step 1 */}
          {step === 1 && (
            <div>
              <Label>Age (years)</Label>
              <Input
                type="number"
                placeholder="e.g., 2.5"
                value={formData.age}
                onChange={(e) => updateField("age", e.target.value)}
              />

              <Label>Gender</Label>
              <RadioGroup value={formData.gender} onValueChange={(v) => updateField("gender", v)}>
                <div>
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div>
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>

              <Button onClick={() => setStep(2)}>Next</Button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <Label>Weight (kg)</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => updateField("weight", e.target.value)}
              />
              <Label>Height (cm)</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.height}
                onChange={(e) => updateField("height", e.target.value)}
              />
              <Label>MUAC (cm)</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.muac}
                onChange={(e) => updateField("muac", e.target.value)}
              />
              <Button onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)}>Next</Button>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <Label>Bilateral Pitting Edema?</Label>
              <RadioGroup value={formData.edema} onValueChange={(v) => updateField("edema", v)}>
                <div>
                  <RadioGroupItem value="no" id="edema-no" />
                  <Label htmlFor="edema-no">No</Label>
                </div>
                <div>
                  <RadioGroupItem value="yes" id="edema-yes" />
                  <Label htmlFor="edema-yes">Yes</Label>
                </div>
              </RadioGroup>

              <Label>Appetite</Label>
              <RadioGroup value={formData.appetite} onValueChange={(v) => updateField("appetite", v)}>
                <div>
                  <RadioGroupItem value="normal" id="appetite-normal" />
                  <Label htmlFor="appetite-normal">Normal</Label>
                </div>
                <div>
                  <RadioGroupItem value="poor" id="appetite-poor" />
                  <Label htmlFor="appetite-poor">Poor/Reduced</Label>
                </div>
              </RadioGroup>

              <Label>Recent Illness?</Label>
              <RadioGroup value={formData.recentIllness} onValueChange={(v) => updateField("recentIllness", v)}>
                <div>
                  <RadioGroupItem value="no" id="illness-no" />
                  <Label htmlFor="illness-no">No</Label>
                </div>
                <div>
                  <RadioGroupItem value="yes" id="illness-yes" />
                  <Label htmlFor="illness-yes">Yes</Label>
                </div>
              </RadioGroup>

              <Button onClick={() => setStep(2)}>Back</Button>
              <Button onClick={handleSubmit}>Calculate Results</Button>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && result && (
            <div>
              <Alert className={`alert-${result.color}`}>
                {result.severity === "severe" ? <AlertCircle /> : <CheckCircle />}
                <AlertTitle>{result.status}</AlertTitle>
                <AlertDescription>
                  BMI: {result.bmi} | Weight: {formData.weight}kg | Height: {formData.height}cm
                  {formData.muac && ` | MUAC: ${formData.muac}cm`}
                </AlertDescription>
              </Alert>

              <h4>Recommendations:</h4>
              <ul>
                {result.recommendations.map((rec, i) => (
                  <li key={i}>• {rec}</li>
                ))}
              </ul>

              <Button onClick={() => setStep(1)}>New Screening</Button>
              <Button>Save Results</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
