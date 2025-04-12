import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 1. Parse the incoming data from the request body.
    const data = await request.json();
    // 2. Log the received data (for debugging purposes).
    console.log('Received data in /api/user/route.js:', data);

    // 3. Validate the data.
    if (!data.maxScore) {
      return NextResponse.json({ error: 'Missing "maxScore" in request body' }, { status: 400 });
    }

    const receivedMaxScore = data.maxScore;
    console.log('Processed maxScore:', receivedMaxScore);

    // 4. Send a response back to the client.
    return NextResponse.json({ 
      message: 'User data received and processed successfully!',
      processed: `Received and processed maxScore: ${receivedMaxScore}` 
    }, { status: 200 });
  } catch (error) {
    // 5. Handle errors.
    console.error('Error in /api/user/route.js:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}