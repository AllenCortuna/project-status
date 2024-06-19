// api/search-contracts/route.js
import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Contract from "../../../models/contract";

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const contractID = searchParams.get('contractID');
    const projectName = searchParams.get('projectName');
    const batch = searchParams.get('batch');
    const status = searchParams.get('status');

    const query = {};

    if (contractID) query.contractID = contractID;
    if (projectName) query.projectName = { $regex: projectName, $options: 'i' }; // Case insensitive search
    if (batch) query.batch = batch;
    if (status) query.status = status;

    const contracts = await Contract.find(query);

    return NextResponse.json({ result: contracts });
  } catch (error) {
    console.error("ERROR: ", error);
    return NextResponse.json({ error: `ERROR: ${error.message}` }, { status: 500 });
  }
}
