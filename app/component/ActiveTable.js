"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const ActiveTable = ({ data }) => {
  return (
    <div className="flex justify-center flex-col gap-5 mx-auto">
      <div className="flex flex-col mx-auto border border-zinc-300 rounded-lg mt-5 overflow-x-auto scroll-container max-h-[40rem]">
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
                  </span>:&nbsp;
                  {info.projectName}
                </td>
                <td className="text-xs text-zinc-500">{info?.preBid?.split("T")[0] || ""}</td>
                <td className="text-xs text-zinc-500">{info?.bidding?.split("T")[0] || ""}</td>
                <td>
                <button  className="btn btn-primary btn-sm text-xs text-white">
                  <Link href={`/update-contract/${info._id}`}>
                    Update
                  </Link>
                </button >
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
