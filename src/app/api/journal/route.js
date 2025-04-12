'use server';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body); // Log the entire request body for debugging

    const { journalEntry } = body;

    if (!journalEntry) {
      return NextResponse.json({ error: 'Missing "journalEntry" in request body' }, { status: 400 });
    }

    console.log('Received journal entry:', journalEntry);

    // For demonstration, we'll just return a success response
    return NextResponse.json({ message: 'Journal entry received successfully!' });
  } catch (error) {
    console.error('Error processing journal entry:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}