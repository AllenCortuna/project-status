// components/SearchContracts.js
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { errorToast } from "@/config/toast";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import query from "../../public/img/Query-Insight.svg";
import ContractTable from "../component/ContractTable";
import ContractDetails from "../component/ContractDetails";

const SearchContracts = () => {
  const [contractID, setContractID] = useState("");
  const [projectName, setProjectName] = useState("");
  const [batch, setBatch] = useState("");
  const [status, setStatus] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [contract, setContract] = useState(null);
  const handleDetails = (info) => {
    setContract(info);
  };
  const handleClose = () => {
    setContract(null);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, [isLogin]);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!contractID && !projectName && !batch && !status) {
        errorToast("Please fill at least 1 input field");
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
      {contract && (
        <ContractDetails contract={contract} handleClose={handleClose} />
      )}
      <div className="grid grid-cols-3 mt-10 gap-4 mb-4 max-w-[40rem]">
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

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="custom-input"
        >
          <option value="">🔽 Status</option>
          <option value="posted">Posted</option>
          <option value="awarded">Awarded</option>
          <option value="proceed">Proceed</option>
        </select>

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
          isLoading ? "btn-disable" : "btn-primary text-white"
        } text-xs mt-5 mx-auto`}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Search"}
      </button>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <div>
        {results.length > 0 ? (
          <ContractTable
            data={results}
            handleDetails={handleDetails}
            isLogin={isLogin}
          />
        ) : (
          !isLoading && (
            <div className="w-[30rem] flex justify-center items-center flex-col mt-10">
              <Image src={query} alt="Query Logo.png" width={300} />
              <p className="text-xs font-bold px-5 text-primary border rounded-lg p-3 border-primary">
                No results found.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchContracts;
