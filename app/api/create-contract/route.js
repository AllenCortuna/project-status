import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Contract from "../../../models/contract";

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    console.log("data", data);
    // Check if a contract with the same contractID already exists
    const existingContract = await Contract.findOne({
      contractID: data.contractID,
    });
    if (existingContract) {
      return NextResponse.json({
        error: "A contract with the same Contract NO already exists.",
      },{ status: 409 });
    }
    console.log("existingContract", existingContract);
    try {
      const contract = new Contract({
        ...data,
      });

      const result = await contract.save();
      return NextResponse.json({
        data: result,
      });
    } catch (error) {
      console.log("error :>> ", error);
      return NextResponse.json({
        error: `Error saving contract: ${error.message}`,
      },{ status: 500 });
    }
  } catch (error) {
    console.error("ERROR: ", error);
    return NextResponse.json({
      error: `ERROR: ${error.message}`,
    },{ status: 500 });
  }
}
