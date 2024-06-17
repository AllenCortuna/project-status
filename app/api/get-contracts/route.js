import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Contract from "../../../models/contract";

export async function GET(request) {
  try {
    await connectToDatabase();
    // const posted = await Contract.find({status: "posted"});
    // const awarded = await Contract.find({status: "awarded"});
    // const incompleteDoc = await Contract.find({ isDocComplete: true });
    const results = await Contract.find();

    return NextResponse.json({
      results,
    });
  } catch (error) {
    console.error("ERROR: ", error);
    return NextResponse.json({
      error: `ERROR: ${error}`,
    }, { status: 500 });
  }
}
