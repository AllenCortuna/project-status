import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Contract from "../../../models/contract";
import { ObjectId } from "mongodb"; // Import ObjectId if needed for MongoDB ID

export async function POST(request) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Parse the request body
    const { id } = await request.json();
    console.log('id', id);

    // Ensure id is properly handled (convert to ObjectId if necessary)
    const objectId = new ObjectId(id);

    // Fetch the contract by ID
    const result = await Contract.findOne({ _id: objectId });

    // Return the result as JSON
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
