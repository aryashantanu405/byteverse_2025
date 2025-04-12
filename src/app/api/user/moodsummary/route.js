'use server'
import { NextResponse } from "next/server"
const moodSummary = {
    calm: 1,
    stressed: 6,
    total: 7,
  };
export async function GET(request){
    return NextResponse.json(moodSummary)
}