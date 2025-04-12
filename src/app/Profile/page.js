"use client";

import { useUser } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  CalendarClock,
  Edit,
  PlusCircle,
  SmilePlus,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const moodData = [
  { day: "Mon", mood: 4 },
  { day: "Tue", mood: 3 },
  { day: "Wed", mood: 5 },
  { day: "Thu", mood: 4 },
  { day: "Fri", mood: 3 },
  { day: "Sat", mood: 4 },
  { day: "Sun", mood: 5 },
];

const journalEntries = [
  { title: "Finding Peace in Chaos", date: "2024-03-20" },
  { title: "Today's Reflections", date: "2024-03-19" },
  { title: "Small Victories", date: "2024-03-18" },
];

const goals = [
  { text: "Practice mindfulness for 10 minutes daily", completed: true },
  { text: "Write in journal 3 times this week", completed: false },
  { text: "Take a walk outside each day", completed: true },
];

export default function Profile() {
  const { user } = useUser();

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* User Overview Section */}
        <div className="flex items-center gap-6 bg-card p-6 rounded-lg">
          <Avatar className="h-24 w-24 border-4 border-primary">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user?.fullName}</h1>
            <p className="text-muted-foreground">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>

        {/* Mood Tracking Section */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Mood Tracking</h2>
            <Button variant="outline" size="sm">
              <SmilePlus className="mr-2 h-4 w-4" />
              Log Mood
            </Button>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData}>
                <XAxis dataKey="day" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Happiest Day</p>
              <p className="font-semibold">Wednesday</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Average Mood</p>
              <p className="font-semibold">4.0</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Mood Entries</p>
              <p className="font-semibold">7 Days</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Journal Entries Section */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Journal Entries</h2>
                <Button onClick={()=>router.push('/Journal')} variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  New Entry
                </Button>
              
            </div>
            <div className="space-y-4">
              {journalEntries.map((entry, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-muted rounded-lg"
                >
                  <div>
                    <p className="font-medium">{entry.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {entry.date}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Read
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Goals Section */}
          <div className="space-y-6">
            {/* Therapy Sessions Card */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Therapy Sessions</h2>
                <Button variant="outline">
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Book Session
                </Button>
              </div>
              <p className="text-muted-foreground">No upcoming sessions</p>
            </Card>

            {/* Personal Goals Card */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Personal Goals</h2>
                <Button variant="outline" size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Goal
                </Button>
              </div>
              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-muted rounded-lg"
                  >
                    <Target className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{goal.text}</p>
                      <p className="text-sm text-muted-foreground">
                        {goal.completed ? "Completed" : "In Progress"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
