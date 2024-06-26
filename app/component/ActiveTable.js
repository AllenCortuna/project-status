"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { format } from "date-fns";

const ActiveTable = ({ data, isLogin }) => {
  return (
    <div className="flex justify-center flex-col gap-5 mx-auto">
      <div className="flex flex-col mx-auto border border-zinc-300 rounded-lg mt-5 overflow-x-auto scroll-container max-h-[32rem]">
        <table className="table table-zebra max-w-[72rem] table-pin-rows">
          <thead>
            <tr className="text-xs text-zinc-500">
              <th className="text-xs">Contract with no Award</th>
              <th className="w-40">Pre Bid</th>
              <th className="w-40">Bidding</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((info, ind) => (
              <tr key={ind} className="hover">
                <td className="text-xs text-zinc-500">
                  <span className="text-xs text-primary font-bold">
                    {info.contractID}
                  </span>
                  :&nbsp;
                  {info.projectName}
                </td>
                <td className="text-xs text-zinc-500">
                  {format(new Date(info?.preBid), "MMM-d-yyyy") || ""}
                </td>
                <td className="text-xs text-zinc-500">
                  {format(new Date(info?.bidding), "MMM-d-yyyy") || ""}
                </td>
                <td>
                  <span className="btn btn-primary btn-sm text-xs text-white">
                    {isLogin ? (
                      <Link href={`/update-contract/${info._id}`}>update</Link>
                    ) : (
                      <Link href={`/contract-info/${info._id}`}>details</Link>
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveTable;
