import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Contract from "../../../models/contract";

export async function POST(request) {
  try {
    // Connect to the database
    await connectToDatabase();
    const result = await Contract.find().select('contractID bidding');

    // Return the result as JSON
    console.log('result', result)
    return NextResponse.json({
      result,
    });
  } catch (error) {
    console.error("ERROR: ", error);
    return NextResponse.json(
      {
        error: `ERROR: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
