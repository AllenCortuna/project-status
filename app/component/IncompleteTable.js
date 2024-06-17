"use client";
import Link from "next/link";
import React, {  } from "react";
import { Check } from "react-feather";

const IncompleteTable = ({ data }) => {
  return (
    <div className="flex justify-center flex-col gap-5 mx-auto">
      <div className="flex flex-col mx-auto border border-zinc-300 rounded-lg mt-5 overflow-x-auto max-h-[30rem]">
        <table className="table table-zebra w-[56rem]  table-pin-rows">
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
                  </span>:&nbsp;
                  {info.projectName}
                </td>
                <td className="text-xs text-zinc-500"><Check strokeWidth={3} size={20} className="text-white bg-green-700 rounded-md p-1"/></td>
                <td className="text-xs text-zinc-500"><Check strokeWidth={3} size={20} className="text-white bg-green-700 rounded-md p-1" /></td>
                <td className="text-xs text-zinc-500"></td>
                <td className="text-xs text-zinc-500"><Check strokeWidth={3} size={20} className="text-white bg-green-700 rounded-md p-1" /></td>
                <td className="text-xs text-zinc-500"></td>
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

export default IncompleteTable;
