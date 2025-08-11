"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { GraduationCap, Calculator, Award, Plus, Trash2 } from "lucide-react"

interface Subject {
  id: string
  name: string
  marks: number
  credits: number
  grade: string
  gradePoints: number
}

interface Scholarship {
  name: string
  provider: string
  minCGPA: number
  maxCGPA: number
  amount: string
  description: string
  eligibility: string[]
}

const scholarships: Scholarship[] = [
  {
    name: "Excellence Merit Scholarship",
    provider: "University Foundation",
    minCGPA: 3.8,
    maxCGPA: 4.0,
    amount: "₹2,50,000",
    description: "For students with outstanding academic performance",
    eligibility: ["Minimum 3.8 CGPA", "Full-time enrollment", "Community service"],
  },
  {
    name: "Academic Achievement Award",
    provider: "Education Trust",
    minCGPA: 3.5,
    maxCGPA: 4.0,
    amount: "₹1,50,000",
    description: "Supporting high-achieving students in their academic journey",
    eligibility: ["Minimum 3.5 CGPA", "Leadership experience", "Essay required"],
  },
  {
    name: "Dean's List Scholarship",
    provider: "College Administration",
    minCGPA: 3.3,
    maxCGPA: 4.0,
    amount: "₹1,25,000",
    description: "Recognition for consistent academic excellence",
    eligibility: ["Minimum 3.3 CGPA", "No disciplinary actions", "Recommendation letter"],
  },
  {
    name: "Progress Scholarship",
    provider: "Student Support Fund",
    minCGPA: 3.0,
    maxCGPA: 3.4,
    amount: "₹75,000",
    description: "Encouraging students showing academic improvement",
    eligibility: ["Minimum 3.0 CGPA", "Financial need", "Academic improvement"],
  },
  {
    name: "Foundation Support Grant",
    provider: "Alumni Association",
    minCGPA: 2.5,
    maxCGPA: 3.2,
    amount: "₹50,000",
    description: "Supporting students in their academic development",
    eligibility: ["Minimum 2.5 CGPA", "First-generation college student", "Community involvement"],
  },
]

function getGradeFromMarks(marks: number): { grade: string; gradePoints: number } {
  if (marks >= 90) return { grade: "A+", gradePoints: 4.0 }
  if (marks >= 85) return { grade: "A", gradePoints: 3.7 }
  if (marks >= 80) return { grade: "A-", gradePoints: 3.3 }
  if (marks >= 75) return { grade: "B+", gradePoints: 3.0 }
  if (marks >= 70) return { grade: "B", gradePoints: 2.7 }
  if (marks >= 65) return { grade: "B-", gradePoints: 2.3 }
  if (marks >= 60) return { grade: "C+", gradePoints: 2.0 }
  if (marks >= 55) return { grade: "C", gradePoints: 1.7 }
  if (marks >= 50) return { grade: "C-", gradePoints: 1.3 }
  if (marks >= 45) return { grade: "D", gradePoints: 1.0 }
  return { grade: "F", gradePoints: 0.0 }
}

export default function StudentPortal() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "1", name: "", marks: 0, credits: 3, grade: "", gradePoints: 0 },
  ])
  const [singleMarks, setSingleMarks] = useState<number>(0)
  const [cgpa, setCGPA] = useState<number>(0)

  const addSubject = () => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: "",
      marks: 0,
      credits: 3,
      grade: "",
      gradePoints: 0,
    }
    setSubjects([...subjects, newSubject])
  }

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((subject) => subject.id !== id))
    }
  }

  const updateSubject = (id: string, field: keyof Subject, value: any) => {
    setSubjects(
      subjects.map((subject) => {
        if (subject.id === id) {
          const updated = { ...subject, [field]: value }
          if (field === "marks") {
            const gradeInfo = getGradeFromMarks(value)
            updated.grade = gradeInfo.grade
            updated.gradePoints = gradeInfo.gradePoints
          }
          return updated
        }
        return subject
      }),
    )
  }

  const calculateCGPA = () => {
    const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0)
    const totalGradePoints = subjects.reduce((sum, subject) => sum + subject.gradePoints * subject.credits, 0)
    const calculatedCGPA = totalCredits > 0 ? totalGradePoints / totalCredits : 0
    setCGPA(Math.round(calculatedCGPA * 100) / 100)
  }

  const getEligibleScholarships = () => {
    return scholarships.filter((scholarship) => cgpa >= scholarship.minCGPA && cgpa <= scholarship.maxCGPA)
  }

  const singleGradeInfo = getGradeFromMarks(singleMarks)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Student Academic Portal (makaut edition)</h1>
            </div>
            <p className="text-sm text-gray-600">Track your academic progress & find scholarships</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="grade-converter" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="grade-converter" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Grade Converter
            </TabsTrigger>
            <TabsTrigger value="cgpa-calculator" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              CGPA Calculator
            </TabsTrigger>
            <TabsTrigger value="scholarships" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Scholarships
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grade-converter">
            <Card>
              <CardHeader>
                <CardTitle>Marks to Grade Converter</CardTitle>
                <CardDescription>Convert your marks to letter grades and grade points</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="marks">Enter your marks (0-100)</Label>
                    <Input
                      id="marks"
                      type="number"
                      min="0"
                      max="100"
                      value={singleMarks}
                      onChange={(e) => setSingleMarks(Number(e.target.value))}
                      placeholder="Enter marks"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Grade:</span>
                        <Badge variant="secondary" className="text-lg">
                          {singleGradeInfo.grade}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-medium text-gray-600">Grade Points:</span>
                        <span className="text-lg font-bold text-blue-600">{singleGradeInfo.gradePoints}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Grading Scale</h3>
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      { range: "90-100", grade: "A+", points: "4.0" },
                      { range: "85-89", grade: "A", points: "3.7" },
                      { range: "80-84", grade: "A-", points: "3.3" },
                      { range: "75-79", grade: "B+", points: "3.0" },
                      { range: "70-74", grade: "B", points: "2.7" },
                      { range: "65-69", grade: "B-", points: "2.3" },
                      { range: "60-64", grade: "C+", points: "2.0" },
                      { range: "55-59", grade: "C", points: "1.7" },
                      { range: "50-54", grade: "C-", points: "1.3" },
                      { range: "45-49", grade: "D", points: "1.0" },
                      { range: "0-44", grade: "F", points: "0.0" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{item.range}</span>
                        <Badge variant="outline">{item.grade}</Badge>
                        <span className="text-sm font-medium">{item.points}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cgpa-calculator">
            <Card>
              <CardHeader>
                <CardTitle>CGPA Calculator</CardTitle>
                <CardDescription>Calculate your Cumulative Grade Point Average</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {subjects.map((subject, index) => (
                    <div key={subject.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Subject {index + 1}</h4>
                        {subjects.length > 1 && (
                          <Button variant="outline" size="sm" onClick={() => removeSubject(subject.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid gap-4 md:grid-cols-4">
                        <div className="space-y-2">
                          <Label>Subject Name</Label>
                          <Input
                            value={subject.name}
                            onChange={(e) => updateSubject(subject.id, "name", e.target.value)}
                            placeholder="e.g., Mathematics"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Marks</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={subject.marks}
                            onChange={(e) => updateSubject(subject.id, "marks", Number(e.target.value))}
                            placeholder="0-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Credits</Label>
                          <Select
                            value={subject.credits.toString()}
                            onValueChange={(value) => updateSubject(subject.id, "credits", Number(value))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                              <SelectItem value="6">6</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Grade</Label>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{subject.grade}</Badge>
                            <span className="text-sm text-gray-600">({subject.gradePoints})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button onClick={addSubject} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Subject
                  </Button>
                  <Button onClick={calculateCGPA}>Calculate CGPA</Button>
                </div>

                {cgpa > 0 && (
                  <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-green-800 mb-2">Your CGPA</h3>
                      <div className="text-4xl font-bold text-green-600 mb-2">{cgpa}</div>
                      <p className="text-sm text-green-700">
                        {cgpa >= 3.5
                          ? "Excellent performance!"
                          : cgpa >= 3.0
                            ? "Good performance!"
                            : cgpa >= 2.5
                              ? "Satisfactory performance"
                              : "Keep working hard!"}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scholarships">
            <Card>
              <CardHeader>
                <CardTitle>Scholarship Recommendations</CardTitle>
                <CardDescription>
                  {cgpa > 0
                    ? `Based on your CGPA of ${cgpa}, here are scholarships you may be eligible for:`
                    : "Calculate your CGPA first to see personalized scholarship recommendations"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cgpa > 0 ? (
                  <div className="space-y-4">
                    {getEligibleScholarships().length > 0 ? (
                      getEligibleScholarships().map((scholarship, index) => (
                        <div key={index} className="p-6 border rounded-lg space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{scholarship.name}</h3>
                              <p className="text-sm text-gray-600">{scholarship.provider}</p>
                            </div>
                            <Badge variant="secondary" className="text-lg font-bold">
                              {scholarship.amount}
                            </Badge>
                          </div>
                          <p className="text-gray-700">{scholarship.description}</p>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Eligibility Requirements:</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {scholarship.eligibility.map((req, reqIndex) => (
                                <li key={reqIndex} className="text-sm text-gray-600">
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>
                              CGPA Range: {scholarship.minCGPA} - {scholarship.maxCGPA}
                            </span>
                            <Badge variant="outline" className="text-green-600">
                              ✓ Eligible
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No scholarships found</h3>
                        <p className="text-gray-600">
                          Keep working hard! Improve your CGPA to unlock more scholarship opportunities.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Calculate your CGPA first</h3>
                    <p className="text-gray-600 mb-4">
                      Go to the CGPA Calculator tab to calculate your CGPA and get personalized scholarship
                      recommendations.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
