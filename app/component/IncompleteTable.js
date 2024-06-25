"use client";
import Link from "next/link";
import React from "react";
import { Check } from "react-feather";

const IncompleteTable = ({ data, isLogin }) => {
  return (
    <div className="flex justify-center flex-col gap-5 mx-auto">
      <div className="flex flex-col mx-auto border border-zinc-300 rounded-lg mt-5 overflow-x-auto max-h-[32rem]">
        <table className="table table-zebra max-w-[72rem]  table-pin-rows">
          <thead>
            <tr className="text-xs text-zinc-500">
              <th className="text-xs">Incomplete Documents List</th>
              <th>Permit</th>
              <th>Bonds</th>
              <th>CARI</th>
              <th>Pert CPM</th>
              <th>Free/Clean</th>
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
                  {info?.submittedDocuments?.mayorPermit &&
                  info?.submittedDocuments?.busPermit ? (
                    <Check
                      strokeWidth={3}
                      size={20}
                      className="text-white bg-green-700 rounded-md p-1"
                    />
                  ) : null}
                </td>
                <td className="text-xs text-zinc-500">
                  {info?.submittedDocuments?.bonds ? (
                    <Check
                      strokeWidth={3}
                      size={20}
                      className="text-white bg-green-700 rounded-md p-1"
                    />
                  ) : null}
                </td>
                <td className="text-xs text-zinc-500">
                  {info?.submittedDocuments?.cari ? (
                    <Check
                      strokeWidth={3}
                      size={20}
                      className="text-white bg-green-700 rounded-md p-1"
                    />
                  ) : null}
                </td>
                <td className="text-xs text-zinc-500">
                  {info?.submittedDocuments?.pertCPM ? (
                    <Check
                      strokeWidth={3}
                      size={20}
                      className="text-white bg-green-700 rounded-md p-1"
                    />
                  ) : null}
                </td>
                <td className="text-xs text-zinc-500">
                  {info?.submittedDocuments?.freeClean ? (
                    <Check
                      strokeWidth={3}
                      size={20}
                      className="text-white bg-green-700 rounded-md p-1"
                    />
                  ) : null}
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

export default IncompleteTable;
