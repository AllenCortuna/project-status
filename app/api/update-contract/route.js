import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Contract from "../../../models/contract";

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    console.log("data", data);

    // Check if all submittedDocuments are true, excluding _id
    if (data.submittedDocuments) {
      data.isDocComplete = Object.entries(data.submittedDocuments)
        .filter(([key]) => key !== "_id")
        .every(([, value]) => value === true);
    } else {
      data.isDocComplete = false;
    }

    // Set contract status based on other fields
    if (data.noa && data.ntp) {
      data.status = "proceed";
    } else if (data.noa) {
      data.status = "awarded";
    } else {
      data.status = "posted";
    }

    let result;
    if (data.contractID) {
      // If contractID is present, update the existing contract
      result = await Contract.findOneAndUpdate(
        { contractID: data.contractID },
        data,
        { new: true, runValidators: true }
      );
    } else {
      // If no contractID, create a new contract
      const contract = new Contract(data);
      result = await contract.save();
    }

    return NextResponse.json({
      data: result,
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
