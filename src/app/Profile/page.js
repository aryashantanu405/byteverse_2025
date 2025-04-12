"use client";
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import {
  CalendarClock,
  Edit,
  PlusCircle,
  SmilePlus,
  Target,
  Frown,
  Meh,
  Smile as SmileIcon,
  PartyPopper
} from "lucide-react";
import Link from "next/link";
import { set } from 'date-fns';

const moodIcons = {
  1: <Frown className="w-12 h-12 text-red-500" />,
  2: <Meh className="w-12 h-12 text-orange-500" />,
  3: <SmileIcon className="w-12 h-12 text-yellow-500" />,
  4: <PartyPopper className="w-12 h-12 text-green-500" />
};

const moodLabels = {
  1: "Not Great",
  2: "Okay",
  3: "Good",
  4: "Great"
};

export default function Profile() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [moodData, setMoodData] = useState([
    { day: "Mon", mood: 4 },
    { day: "Tue", mood: 3 },
    { day: "Wed", mood: 5 },
    { day: "Thu", mood: 4 },
    { day: "Fri", mood: 3 },
    { day: "Sat", mood: 4 },
    { day: "Sun", mood: 5 },
  ]);
  const [currentMood, setCurrentMood] = useState(3);
  const [showMoodDialog, setShowMoodDialog] = useState(false);
  const [averagemood, setaveragemood] = useState(3);
  const [happiest_day, sethappiest_day] = useState("Mon");
  const handleMoodSubmit = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = days[new Date().getDay()];
    
    setMoodData(prevData => {
      const newData = [...prevData];
      const todayIndex = newData.findIndex(item => item.day === today);
      
      if (todayIndex !== -1) {
        newData[todayIndex] = { day: today, mood: currentMood };
      } else {
        newData.push({ day: today, mood: currentMood });
      }
      
      return newData;
    });
    
    setShowMoodDialog(false);
  };
  const getmooddata = async () => {
    const response = await fetch("/api/user/mooddata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMoodData(data.moodvalues);
    setaveragemood(data.averagemood);
    sethappiest_day(data.happiestDay);
  }

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
    else{
      getmooddata();
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center text-lg">Loading...</div>;
  }

  if (!isSignedIn) return null;

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
            <Dialog open={showMoodDialog} onOpenChange={setShowMoodDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <SmilePlus className="mr-2 h-4 w-4" />
                  Log Mood
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>How are you feeling today?</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="flex justify-center">
                    {moodIcons[currentMood]}
                  </div>
                  <div className="text-center font-medium text-lg">
                    {moodLabels[currentMood]}
                  </div>
                  <Slider
                    value={[currentMood]}
                    onValueChange={([value]) => setCurrentMood(value)}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <Button onClick={handleMoodSubmit} className="w-full">
                    Save Mood
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={moodData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis
                  dataKey="day"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  domain={[0, 5]}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  ticks={[0, 1, 2, 3, 4, 5]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Happiest Day</p>
              <p className="font-semibold">{happiest_day}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Average Mood</p>
              <p className="font-semibold">{averagemood}</p>
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
              <Button onClick={() => router.push('/Journal')} variant="outline" size="sm">
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
                <Button variant="outline" onClick={() => router.push('/Consultation')} size="sm">
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
                {/* <Button variant="outline" size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Goal
                </Button> */}
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