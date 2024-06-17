"use client";
import React, { useState, useEffect } from "react";
import { Square } from "react-feather";
import { XCircle } from "react-feather";
import { CheckSquare } from "react-feather";
import { CloudLightning } from "react-feather";

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
                <td className="text-xs text-zinc-500"><CheckSquare strokeWidth={3} size={20} className="text-green-700"/></td>
                <td className="text-xs text-zinc-500"><CheckSquare strokeWidth={3} size={20} className="text-green-700"/></td>
                <td className="text-xs text-zinc-500"><CheckSquare strokeWidth={3} size={20} className="text-green-700"/></td>
                <td className="text-xs text-zinc-500"><CheckSquare strokeWidth={3} size={20} className="text-green-700"/></td>
                <td className="text-xs text-zinc-500"><Square strokeWidth={3} size={20} className="text-zinc-400"/></td>
                <td>
                  <button className="btn btn-primary btn-sm text-xs text-white">
                    Update
                  </button>
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
