"use client";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";

const AwardTable = ({ data, isLogin }) => {
  return (
    <div className="flex justify-center flex-col gap-5 mx-auto">
      <div className="flex flex-col mx-auto border border-zinc-300 rounded-lg mt-5 overflow-x-auto max-h-[32rem]">
        <table className="table table-zebra max-w-[72rem] table-pin-rows">
          <thead>
            <tr className="text-xs text-zinc-500">
              <th className="text-xs">Awarded List</th>
              <th className="w-40">Bidding</th>
              <th className="w-40">NOA</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((info, ind) => (
              <tr key={ind} className="hover">
                <td
                  className="text-xs tooltip text-zinc-500 hover:cursor-pointer text-left"
                  data-tip="Clik to copy."
                  onClick={() =>
                    navigator.clipboard.writeText(info.projectName)
                  }
                >
                  <span className="text-xs text-primary font-bold">
                    {info.contractID}
                  </span>
                  :&nbsp;
                  {info.projectName}
                </td>
                <td className="text-xs text-zinc-500">
                  {format(new Date(info?.bidding), "MMM-d-yyyy") || ""}
                </td>
                <td className="text-xs text-zinc-500">
                  {format(new Date(info?.noa), "MMM-d-yyyy") || ""}
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

export default AwardTable;
