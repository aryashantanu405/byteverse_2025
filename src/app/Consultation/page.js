"use client";

import { useState } from "react";
import { MapPin, Calendar, Video, Phone, Star, Search, Filter, Clock, BookOpen, Users, Heart, Brain, Sparkles, ArrowRight, Youtube, FileText, MessageCircle, CheckCircle2, BookMarked, Headphones, ScrollText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const professionals = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Clinical Psychologist",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&h=200&fit=crop",
    fee: 150,
    availability: "Online/Offline",
    location: "New York, NY",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Psychiatrist",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&fit=crop",
    fee: 200,
    availability: "Online Only",
    location: "San Francisco, CA",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialization: "Counselor",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=200&h=200&fit=crop",
    fee: 120,
    availability: "Online/Offline",
    location: "Chicago, IL",
  },
];

const supportCircles = [
  {
    id: 1,
    title: "Anxiety Support Group",
    schedule: "Every Monday, 7 PM EST",
    facilitator: "Dr. Emily White",
    participants: 12,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&h=200&fit=crop",
    description: "A safe space to share experiences and learn coping strategies for anxiety.",
    tags: ["Anxiety", "Group Support", "Weekly"],
  },
  {
    id: 2,
    title: "Student Stress Management",
    schedule: "Every Wednesday, 6 PM EST",
    facilitator: "Prof. David Miller",
    participants: 15,
    image: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=200&h=200&fit=crop",
    description: "Weekly sessions focused on academic stress and work-life balance.",
    tags: ["Academic Stress", "Work-Life Balance", "Weekly"],
  },
  {
    id: 3,
    title: "Mindfulness Practice",
    schedule: "Every Friday, 8 AM EST",
    facilitator: "Lisa Thompson",
    participants: 20,
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=200&h=200&fit=crop",
    description: "Group meditation and mindfulness exercises for mental wellness.",
    tags: ["Mindfulness", "Meditation", "Weekly"],
  },
];

const resources = [
  {
    id: 1,
    title: "Understanding Anxiety",
    type: "Article",
    author: "Dr. Sarah Johnson",
    duration: "10 min read",
    image: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=200&h=200&fit=crop",
    description: "Learn about anxiety symptoms, triggers, and coping mechanisms.",
    icon: BookMarked,
  },
  {
    id: 2,
    title: "Guided Meditation Series",
    type: "Audio",
    author: "Lisa Thompson",
    duration: "15 min",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=200&h=200&fit=crop",
    description: "A collection of guided meditations for stress relief and relaxation.",
    icon: Headphones,
  },
  {
    id: 3,
    title: "Stress Management Guide",
    type: "PDF Guide",
    author: "Prof. David Miller",
    duration: "20 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=200&h=200&fit=crop",
    description: "Comprehensive guide to managing academic and personal stress.",
    icon: ScrollText,
  },
];

const quickMatchQuestions = [
  {
    id: 1,
    question: "What type of support are you looking for?",
    options: ["Individual Therapy", "Group Support", "Medication Consultation", "Career Counseling"],
  },
  {
    id: 2,
    question: "What are your main concerns?",
    options: ["Anxiety", "Depression", "Stress", "Relationships", "Academic Performance"],
  },
  {
    id: 3,
    question: "Do you prefer online or in-person sessions?",
    options: ["Online Only", "In-Person Only", "No Preference"],
  },
];

export default function ConsultationPage() {
    const [selectedTab, setSelectedTab] = useState("find");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState([]);
  
    const handleQuizAnswer = (answer) => {
      const newAnswers = [...quizAnswers, answer];
      setQuizAnswers(newAnswers);
      
      if (currentQuestionIndex < quickMatchQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Find Your Mental Health Support</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with licensed professionals, join support circles, or get immediate help through our anonymous chat support.
          </p>
        </div>

        <Tabs defaultValue="find" className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-auto gap-4">
            <TabsTrigger value="find" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Find Professional
            </TabsTrigger>
            <TabsTrigger value="emergency" className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground">
              Emergency Support
            </TabsTrigger>
            <TabsTrigger value="groups" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Support Circles
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Self-Help Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="find" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="flex gap-4 flex-wrap">
                  <Input 
                    placeholder="Search by name or specialization" 
                    className="flex-1"
                    icon={<Search className="w-4 h-4" />}
                  />
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="psychologist">Psychologist</SelectItem>
                      <SelectItem value="psychiatrist">Psychiatrist</SelectItem>
                      <SelectItem value="counselor">Counselor</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online Only</SelectItem>
                      <SelectItem value="offline">In-Person Only</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-6">
                  {professionals.map((professional) => (
                    <Card key={professional.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex gap-6">
                        <img
                          src={professional.image}
                          alt={professional.name}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold">{professional.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                              <span>{professional.rating}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground">{professional.specialization}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {professional.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {professional.availability}
                            </span>
                            <span className="flex items-center gap-1">
                              ${professional.fee}/hour
                            </span>
                          </div>
                          <div className="flex gap-3 mt-4">
                            <Button>Book Consultation</Button>
                            <Button variant="outline">View Profile</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Match Quiz</h3>
                  {currentQuestionIndex < quickMatchQuestions.length ? (
                    <div className="space-y-4">
                      <p className="text-muted-foreground mb-4">
                        Question {currentQuestionIndex + 1} of {quickMatchQuestions.length}
                      </p>
                      <h4 className="font-medium">
                        {quickMatchQuestions[currentQuestionIndex].question}
                      </h4>
                      <div className="space-y-2">
                        {quickMatchQuestions[currentQuestionIndex].options.map((option) => (
                          <Button
                            key={option}
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => handleQuizAnswer(option)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <CheckCircle2 className="w-12 h-12 mx-auto text-green-500" />
                      <p>Thanks for completing the quiz! We'll match you with the best professionals.</p>
                      <Button
                        onClick={() => {
                          setCurrentQuestionIndex(0);
                          setQuizAnswers([]);
                        }}
                        variant="outline"
                      >
                        Retake Quiz
                      </Button>
                    </div>
                  )}
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Need Immediate Help?</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect with our anonymous chat support or call emergency helpline.
                  </p>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Helpline
                    </Button>
                    <Button variant="outline" className="w-full">
                      Start Anonymous Chat
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="emergency" className="space-y-6">
            <Card className="p-6 border-destructive">
              <h2 className="text-2xl font-bold mb-4">Emergency Support</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-destructive text-destructive-foreground">
                    <h3 className="text-xl font-semibold mb-4">Immediate Crisis Support</h3>
                    <div className="space-y-4">
                      <Button variant="secondary" className="w-full py-8 text-lg">
                        <Phone className="w-6 h-6 mr-2" />
                        Call Emergency Helpline
                      </Button>
                      <p className="text-sm">
                        Available 24/7 - Free, confidential support for anyone in crisis
                      </p>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Quick Access Contacts</h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full py-4">
                        Contact Trusted Person
                      </Button>
                      <Button variant="outline" className="w-full py-4">
                        College Counselor
                      </Button>
                      <Button variant="outline" className="w-full py-4">
                        Campus Security
                      </Button>
                    </div>
                  </Card>
                </div>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Crisis Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-secondary">
                      <h4 className="font-medium mb-2">Panic Attack</h4>
                      <p className="text-sm text-muted-foreground">Quick breathing exercises and grounding techniques</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary">
                      <h4 className="font-medium mb-2">Suicidal Thoughts</h4>
                      <p className="text-sm text-muted-foreground">Immediate steps and support resources</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary">
                      <h4 className="font-medium mb-2">Safety Plan</h4>
                      <p className="text-sm text-muted-foreground">Create your personal crisis plan</p>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportCircles.map((circle) => (
                <Card key={circle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={circle.image}
                    alt={circle.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">{circle.title}</h3>
                    <p className="text-muted-foreground">{circle.description}</p>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4" />
                        {circle.participants} participants
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        {circle.schedule}
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4" />
                        Facilitated by {circle.facilitator}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {circle.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button className="w-full mt-4">Join Circle</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <resource.icon className="w-5 h-5" />
                      <span className="text-sm text-muted-foreground">{resource.type}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{resource.title}</h3>
                    <p className="text-muted-foreground">{resource.description}</p>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4" />
                        By {resource.author}
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4" />
                        {resource.duration}
                      </p>
                    </div>
                    <Button className="w-full mt-4">Access Resource</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
