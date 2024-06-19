import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Contract from '../../../models/contract';

export async function POST(request) {
  try {
    await connectToDatabase();
    console.log('Database connected');

    const statusConditions = { status: { $in: ['posted', 'awarded', 'proceed'] } };
    const docConditions = { isDocComplete: false, status: { $in: ['awarded', 'proceed'] } };

    const [posted, awarded, incompleteDoc, contracts] = await Promise.all([
      Contract.countDocuments({ status: 'posted' }),
      Contract.countDocuments({ status: 'awarded' }),
      Contract.countDocuments(docConditions),
      Contract.find(statusConditions).sort({ lastUpdated: -1 })
    ]);

    const activeList = contracts.filter(contract => contract.status === 'posted');
    const awardedList = contracts.filter(contract => contract.status === 'awarded');
    const incompleteDocList = contracts.filter(contract => docConditions.status.$in.includes(contract.status) && !contract.isDocComplete);

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
