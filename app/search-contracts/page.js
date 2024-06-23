// components/SearchContracts.js
"use client";
import React, { useState,useEffect } from "react";
import axios from "axios";
import { errorToast } from "@/config/toast";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import query from '../../public/img/Query-Insight.svg'


const SearchContracts = () => {
  const [contractID, setContractID] = useState("");
  const [projectName, setProjectName] = useState("");
  const [batch, setBatch] = useState("");
  const [status, setStatus] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, [isLogin]);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!contractID && !projectName && !batch && !status) {
        errorToast("Please fill atleast 1 input field");
      } else {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/search-contracts`,
          {
            params: {
              contractID,
              projectName,
              batch,
              status,
            },
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );
        setResults(response.data.result);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-screen flex-col justify-center items-center p-5">
      <ToastContainer />
      <div className="grid grid-cols-3 mt-10  gap-4 mb-4 max-w-[40rem]">
        <input
          type="text"
          placeholder="Contract ID"
          value={contractID}
          onChange={(e) => setContractID(e.target.value)}
          className="custom-input"
        />

        <input
          type="text"
          placeholder="Batch"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          className="custom-input"
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="custom-input"
        />

        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="custom-input col-span-3"
        />
      </div>
      <button
        onClick={handleSearch}
        className={`btn ${
          isLoading ? "btn-disable" : "btn-neutral"
        } text-xs mt-5 w-48 mx-auto`}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Search"}
      </button>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <div>
        {results.length > 0 ? (
          <div className="flex flex-col mx-auto border border-zinc-300 rounded-lg mt-5 overflow-x-auto scroll-container max-h-[30rem]">
            <table className="table table-zebra max-w-[72rem] table-pin-rows">
              <thead>
                <tr className="text-xs text-zinc-500">
                  <th className="text-xs">Result base on your search</th>
                  <th className="w-40">Status</th>
                  <th className="w-40">last Update</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {results?.map((info, ind) => (
                  <tr key={ind} className="hover">
                    <td className="text-xs text-zinc-500">
                      <span className="text-xs text-primary font-bold">
                        {info.contractID}
                      </span>
                      :&nbsp;
                      {info.projectName}
                    </td>
                    <td className="text-xs text-zinc-500">
                      {info?.status || ""}
                    </td>
                    <td className="text-xs text-zinc-500">
                      {info?.lastUpdated?.split("T")[0] || ""}
                    </td>
                    <td>
                    <span className="btn btn-primary btn-sm text-xs text-white">
                    {isLogin ? (
                      <Link href={`/update-contract/${info._id}`}>Update</Link>
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
        ) : (
          !isLoading && (
            <div className="w-[30rem] flex justify-center items-center flex-col mt-10">
              <Image
                src={query}
                alt="Query Logo.png"
                width={300}
              />
              <p className="text-xs font-bold px-5 text-primary border rounded-lg p-3 border-primary">No results found.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchContracts;
