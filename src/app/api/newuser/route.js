import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the incoming JSON data from the request body
    const user = await request.json();
    // console.log('Received user data:', user);
    return NextResponse.json({ message: 'User data received successfully!' });
  } catch (error) {
    console.error('Error processing user data:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}