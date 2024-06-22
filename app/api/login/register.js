import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/user';

export async function POST(request) {
  try {
    await connectToDatabase();
    console.log('Database connected');

    const { username, password } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        {
          error: 'Username already taken',
        },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = new User({
      username,
      password,  // Store the plaintext password (not recommended for production)
    });

    await newUser.save();

    return NextResponse.json({
      result: {
        message: 'User registered successfully',
        username: newUser.username,
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
