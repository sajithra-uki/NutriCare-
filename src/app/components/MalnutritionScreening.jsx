import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Progress } from "@/app/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { AlertCircle, CheckCircle, TrendingDown, TrendingUp } from "lucide-react";

export function MalnutritionScreening() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    muac: '',
    gender: 'male',
    edema: 'no',
    appetite: 'normal',
    recentIllness: 'no'
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

    // Simple WHO-based calculation (simplified for demo)
    const bmi = weight / ((height / 100) ** 2);
    
    let status = 'Normal';
    let severity = 'none';
    let color = 'green';
    let recommendations = [];

    // MUAC-based screening (for children 6-59 months)
    if (age >= 0.5 && age <= 5) {
      if (muac < 11.5) {
        status = 'Severe Acute Malnutrition (SAM)';
        severity = 'severe';
        color = 'red';
        recommendations = [
          'Immediate referral to health facility required',
          'Ready-to-Use Therapeutic Food (RUTF) recommended',
          'Daily monitoring needed',
          'Check for medical complications'
        ];
      } else if (muac < 12.5) {
        status = 'Moderate Acute Malnutrition (MAM)';
        severity = 'moderate';
        color = 'orange';
        recommendations = [
          'Supplementary feeding program recommended',
          'Weekly monitoring required',
          'Nutritious food supplements needed',
          'Follow-up in 7 days'
        ];
      } else {
        status = 'Normal Nutritional Status';
        severity = 'none';
        color = 'green';
        recommendations = [
          'Continue balanced diet',
          'Regular growth monitoring',
          'Promote exclusive breastfeeding (if under 6 months)',
          'Next checkup in 1 month'
        ];
      }
    } else {
      // BMI-based for adults
      if (bmi < 16) {
        status = 'Severe Malnutrition';
        severity = 'severe';
        color = 'red';
        recommendations = [
          'Medical evaluation needed',
          'High-calorie diet plan',
          'Possible hospitalization',
          'Address underlying causes'
        ];
      } else if (bmi < 18.5) {
        status = 'Moderate Malnutrition';
        severity = 'moderate';
        color = 'orange';
        recommendations = [
          'Increase caloric intake',
          'Nutrient-dense meals',
          'Weekly monitoring',
          'Nutritional counseling'
        ];
      } else if (bmi >= 18.5 && bmi < 25) {
        status = 'Normal';
        severity = 'none';
        color = 'green';
        recommendations = [
          'Maintain balanced diet',
          'Regular physical activity',
          'Routine health checkups',
          'Continue good habits'
        ];
      } else {
        status = 'Overweight/Obese';
        severity = 'moderate';
        color = 'orange';
        recommendations = [
          'Balanced diet with portion control',
          'Increase physical activity',
          'Avoid processed foods',
          'Regular health monitoring'
        ];
      }
    }

    // Adjust for other factors
    if (formData.edema === 'yes') {
      severity = 'severe';
      recommendations.unshift('Bilateral edema detected - immediate medical attention required');
    }

    setResult({
      status,
      severity,
      color,
      bmi: bmi.toFixed(1),
      recommendations,
      measurements: {
        age,
        weight,
        height,
        muac,
        bmi
      }
    });
  };

  const handleSubmit = () => {
    calculateMalnutrition();
    setStep(4);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Malnutrition Screening</h2>
        <p className="text-gray-600">WHO-based assessment tool</p>
      </div>

      <div className="mb-6">
        <Progress value={(step / 4) * 100} className="h-2" />
        <p className="text-sm text-gray-500 mt-2">Step {step} of 4</p>
      </div>

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
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="age">Age (years)</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="e.g., 2.5"
                  value={formData.age}
                  onChange={(e) => updateField('age', e.target.value)}
                />
              </div>
              <div>
                <Label>Gender</Label>
                <RadioGroup value={formData.gender} onValueChange={(value) => updateField('gender', value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button onClick={() => setStep(2)} className="w-full">Next</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 12.5"
                  value={formData.weight}
                  onChange={(e) => updateField('weight', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 85.5"
                  value={formData.height}
                  onChange={(e) => updateField('height', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="muac">MUAC - Mid-Upper Arm Circumference (cm)</Label>
                <Input
                  id="muac"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 13.5"
                  value={formData.muac}
                  onChange={(e) => updateField('muac', e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">For children 6-59 months</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                <Button onClick={() => setStep(3)} className="flex-1">Next</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label>Bilateral Pitting Edema?</Label>
                <RadioGroup value={formData.edema} onValueChange={(value) => updateField('edema', value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="edema-no" />
                    <Label htmlFor="edema-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="edema-yes" />
                    <Label htmlFor="edema-yes">Yes</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label>Appetite</Label>
                <RadioGroup value={formData.appetite} onValueChange={(value) => updateField('appetite', value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="appetite-normal" />
                    <Label htmlFor="appetite-normal">Normal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poor" id="appetite-poor" />
                    <Label htmlFor="appetite-poor">Poor/Reduced</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label>Recent Illness (past 2 weeks)?</Label>
                <RadioGroup value={formData.recentIllness} onValueChange={(value) => updateField('recentIllness', value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="illness-no" />
                    <Label htmlFor="illness-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="illness-yes" />
                    <Label htmlFor="illness-yes">Yes</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Back</Button>
                <Button onClick={handleSubmit} className="flex-1">Calculate Results</Button>
              </div>
            </div>
          )}

          {step === 4 && result && (
            <div className="space-y-4">
              <Alert className={`border-2 ${
                result.color === 'red' ? 'border-red-500 bg-red-50' : 
                result.color === 'orange' ? 'border-orange-500 bg-orange-50' : 
                'border-green-500 bg-green-50'
              }`}>
                {result.severity === 'severe' ? (
                  <AlertCircle className={`h-5 w-5 text-${result.color}-600`} />
                ) : result.severity === 'none' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                )}
                <AlertTitle className="text-lg">{result.status}</AlertTitle>
                <AlertDescription>
                  BMI: {result.bmi} | Weight: {formData.weight}kg | Height: {formData.height}cm
                  {formData.muac && ` | MUAC: ${formData.muac}cm`}
                </AlertDescription>
              </Alert>

              <div>
                <h4 className="font-semibold mb-3">Recommendations & Next Steps:</h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> This is a screening tool. For accurate diagnosis and treatment, 
                  consult with a qualified healthcare provider.
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  New Screening
                </Button>
                <Button className="flex-1">Save Results</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
