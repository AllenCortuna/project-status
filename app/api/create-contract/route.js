import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Contract from "../../../models/contract";

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();

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
    }
  } catch (error) {
    console.error("ERROR: ", error);
    return NextResponse.json({
      error: `ERROR: ${error}`,
    });
  }
}
