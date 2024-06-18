import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Contract from "../../../models/contract";

export async function GET(request) {
  try {
    await connectToDatabase();
    console.log('GET STATUS');
    const posted = await Contract.countDocuments({ status: "posted" });
    const awarded = await Contract.countDocuments({ status: "awarded" });
    const incompleteDoc = await Contract.countDocuments({ isDocComplete: false });
    const activeList = await Contract.find({ status: "posted" }).sort({ lastUpdated: -1 });
    const awardedList = await Contract.find({ status: "awarded" }).sort({ lastUpdated: -1 });
    const incompleteDocList = await Contract.find({ isDocComplete: false }).sort({ lastUpdated: -1 });

    console.log('activeList :>> ', activeList);
    return NextResponse.json({
      result: {
        posted,
        awarded,
        incompleteDoc,
        activeList,
        awardedList,
        incompleteDocList
      },
    });
  } catch (error) {
    console.error("ERROR: ", error);
    return NextResponse.json({
      error: `ERROR: ${error}`,
    }, { status: 500 });
  }
}
