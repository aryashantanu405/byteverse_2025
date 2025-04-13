'use server';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { journalEntry } = body;
    if (!journalEntry) {
      return NextResponse.json({ error: 'Missing "journalEntry" in request body' }, { status: 400 });
    }

    console.log('Received journal entry:', journalEntry);

    
    return NextResponse.json({ message: 'Journal entry received successfully!' });
  } catch (error) {
    console.error('Error processing journal entry:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}