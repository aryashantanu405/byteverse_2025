'use server'
import { NextResponse } from "next/server"
const moodSummary = {
    calm: 2,
    stressed: 4 ,
    total: 7,
  };
export async function GET(request){
    return NextResponse.json(moodSummary)
}