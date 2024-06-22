import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/user';

export async function POST(request) {
  try {
    await connectToDatabase();
    console.log('TRY LOGIN');

    const { username, password } = await request.json();

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user || password !== user.password) {
      return NextResponse.json(
        {
          error: 'Invalid username or password',
        },
        { status: 401 }
      );
    }

    // Generate a token (for simplicity, using username as the token)
    const token = username; // In a real application, generate a secure token

    return NextResponse.json({
      result: {
        message: 'Login successful',
        token, // Return the token
      },
    });
  } catch (error) {
    console.error('ERROR: ', error);
    return NextResponse.json(
      {
        error: `ERROR: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
