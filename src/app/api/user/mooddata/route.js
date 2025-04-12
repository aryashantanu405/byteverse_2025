'use server';
import { NextResponse } from "next/server";

const moodvalues = [
  { day: "Mon", mood: 2 },
  { day: "Tue", mood: 4 },
  { day: "Wed", mood: 1 },
  { day: "Thu", mood: 2 },
  { day: "Fri", mood: 5 },
  { day: "Sat", mood: 4 },
  { day: "Sun", mood: 4 },
];

// Calculate the average mood
let averagemood = 0;
for (let i = 0; i < moodvalues.length; i++) {
  averagemood += moodvalues[i].mood;
}
averagemood = Math.ceil(averagemood / moodvalues.length);

// Find the day with the highest mood value
const happiestDay = moodvalues.reduce((maxDay, currentDay) => {
  return currentDay.mood > maxDay.mood ? currentDay : maxDay;
}, moodvalues[0]);

export async function GET(request) {
  return NextResponse.json({
    moodvalues,
    averagemood,
    happiestDay: happiestDay.day, // Return only the day name
  });
}