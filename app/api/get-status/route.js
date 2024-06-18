import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Contract from "../../../models/contract";

export async function GET(request) {
  try {
    await connectToDatabase();
    
    const posted = await Contract.countDocuments({ status: "posted" });
    const awarded = await Contract.countDocuments({ status: "awarded" });
    const incompleteDoc = await Contract.countDocuments({ isDocComplete: false });
    const awardedList = await Contract.find({ status: "awarded" });
    const incompleteDocList = await Contract.find({ isDocComplete: false });
    const activeList = await Contract.find({ status: "posted"} );

    return NextResponse.json({
      result: {
        posted,
        awarded,
        incompleteDoc,
        awardedList,
        incompleteDocList,
        activeList
      },
    });
  } catch (error) {
    console.error("ERROR: ", error);
    return NextResponse.json({
      error: `ERROR: ${error}`,
    }, { status: 500 });
  }
}
