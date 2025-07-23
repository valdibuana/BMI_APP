"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { saveBMIRecord } from "@/app/actions/bmi"

export function BMICalculator() {
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError("")
    setResult(null)

    const response = await saveBMIRecord(formData)

    if (response.error) {
      setError(response.error)
    } else if (response.success) {
      setResult({ bmi: response.bmi!, category: response.category! })
    }

    setLoading(false)
  }

  function getBMIColor(bmi: number) {
    if (bmi < 18.5) return "text-blue-600"
    if (bmi < 25) return "text-green-600"
    if (bmi < 30) return "text-yellow-600"
    return "text-red-600"
  }

  function getBMIAdvice(category: string) {
    switch (category) {
       case "Underweight":
      return {
        advice: "Consider increasing your calorie intake with nutrient-dense foods and strength training to build healthy muscle mass.",
        nutrition: [
          "✔ Whole milk, cheese, and yogurt for healthy fats and protein",
          "✔ Nuts and nut butters for calorie-dense snacks",
          "✔ Avocados and olive oil for healthy fats",
          "✔ Whole grains like brown rice and quinoa",
          "✔ Lean proteins like chicken, fish, and eggs"
        ]
      }
    case "Normal weight":
      return {
        advice: "Maintain your healthy habits! Continue with balanced nutrition and regular physical activity.",
        nutrition: [
          " Variety of colorful fruits and vegetables",
          " Whole grains like oats and whole wheat",
          " Lean proteins (fish, poultry, legumes)",
          " Healthy fats from nuts, seeds, and olive oil",
          " Low-fat dairy or dairy alternatives"
        ]
      }
    case "Overweight":
      return {
        advice: "Consider moderate calorie reduction and increased physical activity. Focus on whole foods and regular exercise.",
        nutrition: [
          " High-fiber foods like vegetables and whole grains",
          " Lean proteins to maintain muscle mass",
          " Healthy fats in moderation (avocados, nuts)",
          " Limit processed sugars and refined carbs",
          " Plenty of water and herbal teas"
        ]
      }
    case "Obese":
      return {
        advice: "Consult with a healthcare provider for a personalized plan. Focus on gradual weight loss through diet and exercise.",
        nutrition: [
          " High-protein foods to promote satiety",
          " Non-starchy vegetables (leafy greens, broccoli)",
          " Whole fruits instead of fruit juices",
          " Whole grains in controlled portions",
          " Limit high-calorie, low-nutrient foods"
        ]
      }
    default:
        return {
          advice: "",
        nutrition: []
        }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
        <CardDescription>Calculate your Body Mass Index</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <RadioGroup defaultValue="male" name="gender" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="gender-male" />
                <Label htmlFor="gender-male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="gender-female" />
                <Label htmlFor="gender-female">Female</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" name="weight" type="number" inputMode="decimal" step="0.1" placeholder="70.0" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" name="height" type="number" placeholder="170" required />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

         {result && (
  <>
    <Alert>
      <AlertDescription>
        <div className="space-y-2">
          <div className="text-lg font-semibold">
            Your BMI: <span className={getBMIColor(result.bmi)}>{result.bmi}</span>
          </div>
          <div>
            Category: <span className="font-medium">{result.category}</span>
          </div>
        </div>
      </AlertDescription>
    </Alert>
    <Alert variant="default" className="bg-green-50 border-green-100">
      <AlertDescription>
        <div className="space-y-3">
          <div className="font-bold text-black">Health Advice:</div>
          <div className="text-black-700">{getBMIAdvice(result.category).advice}</div>
          
          <div className="mt-2">
            <div className="font-semibold text-black">Nutrition Recommendations:</div>
            <ul className="list-disc pl-5 space-y-1 text-black">
              {getBMIAdvice(result.category).nutrition.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  </>
)}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Calculating..." : "Calculate & Save BMI"}
          </Button>
        </form>

       <div className="mt-8">
  <h4 className="text-lg font-semibold text-gray-800 mb-4">BMI Categories</h4>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3 shadow-sm">
      <span className="font-medium text-blue-700">Underweight</span>
      <span className="text-sm text-blue-600 font-semibold">&lt; 18.5</span>
    </div>
    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3 shadow-sm">
      <span className="font-medium text-green-700">Normal weight</span>
      <span className="text-sm text-green-600 font-semibold">18.5 - 24.9</span>
    </div>
    <div className="flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-lg p-3 shadow-sm">
      <span className="font-medium text-yellow-700">Overweight</span>
      <span className="text-sm text-yellow-600 font-semibold">25.0 - 29.9</span>
    </div>
    <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg p-3 shadow-sm">
      <span className="font-medium text-red-700">Obese</span>
      <span className="text-sm text-red-600 font-semibold">≥ 30.0</span>
    </div>
  </div>
</div>

      </CardContent>
    </Card>
  )
}