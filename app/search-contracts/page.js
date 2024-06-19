// components/SearchContracts.js
"use client";
import React, { useState } from "react";
import axios from "axios";
import { errorToast } from "@/config/toast";
import { ToastContainer } from "react-toastify";

const SearchContracts = () => {
  const [contractID, setContractID] = useState("");
  const [projectName, setProjectName] = useState("");
  const [batch, setBatch] = useState("");
  const [status, setStatus] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div>
      <ToastContainer />
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Contract ID"
          value={contractID}
          onChange={(e) => setContractID(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Batch"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
          Search
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <div>
        {results.length > 0 ? (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>Contract ID</th>
                <th>Project Name</th>
                <th>Batch</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((contract) => (
                <tr key={contract._id}>
                  <td>{contract.contractID}</td>
                  <td>{contract.projectName}</td>
                  <td>{contract.batch}</td>
                  <td>{contract.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !isLoading && <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchContracts;
