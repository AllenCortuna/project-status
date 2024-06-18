import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Contract from '../../../models/contract';

export async function GET() {
  try {
    await connectToDatabase();

    console.log('Database connected');

    const [posted, awarded, incompleteDoc, activeList, awardedList, incompleteDocList] = await Promise.all([
      Contract.countDocuments({ status: 'posted' }),
      Contract.countDocuments({ status: 'awarded' }),
      Contract.countDocuments({ isDocComplete: false }),
      Contract.find({ status: 'posted' }).sort({ lastUpdated: -1 }),
      Contract.find({ status: 'awarded' }).sort({ lastUpdated: -1 }),
      Contract.find({ isDocComplete: false }).sort({ lastUpdated: -1 }),
    ]);
    return NextResponse.json({
      result: {
        posted,
        awarded,
        incompleteDoc,
        activeList,
        awardedList,
        incompleteDocList,
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
