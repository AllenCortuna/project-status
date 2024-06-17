"use client";
import { errorToast, successToast } from "@/config/toast";
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

const CreateContracts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    batch: "",
    contractID: "",
    projectName: "",
    posting: "",
    preBid: "",
    bidding: "",
  });
 


  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (
      Object.values(data).some((value) => value === "")
    ) {
      errorToast("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/create-contract`,
        { ...data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        setData({
          batch: data.batch,
          contractID: "",
          projectName: "",
        });
        successToast("Contracts submitted successfully!");
      } else {
        errorToast(`Error: ${response.data.error}`);
      }
      console.log("response", response);
    } catch (error) {
      errorToast(`Error: ${error.response?.data?.error || error.message}`);
      console.log("ERROR: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-screen p-10 justify-center">
      <ToastContainer />
      <form
        className="flex flex-col gap-8 min-w-[60rem] mx-auto mt-20"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-10">
          <span className="gap-2 flex flex-col">
            <p className="primary-text ml-1">Posting Date: </p>
            <input
              name="posting"
              value={data.posting}
              onChange={handleData}
              className="custom-input w-52"
              type="date"
            />
          </span>

          <span className="gap-2 flex flex-col">
            <p className="primary-text ml-1">Pre Bid Date: </p>
            <input
              name="preBid"
              value={data.preBid}
              onChange={handleData}
              className="custom-input w-52"
              type="date"
            />
          </span>
          <span className="gap-2 flex flex-col">
            <p className="primary-text ml-1">Bidding Date: </p>
            <input
              name="bidding"
              value={data.bidding}
              onChange={handleData}
              className="custom-input w-52"
              type="date"
            />
          </span>

          <span className="gap-2 flex flex-col">
            <p className="primary-text ml-1">Batch NO: </p>
            <input
              name="batch"
              value={data.batch}
              onChange={handleData}
              className="custom-input w-52"
              type="text"
            />
          </span>
        </div>
        <div className="flex gap-10">
          <input
            type="text"
            autoComplete="off"
            className="custom-input w-40"
            name="contractID"
            value={data.contractID}
            onChange={handleData}
            placeholder="Contract ID"
          />
          <input
            type="text"
            autoComplete="off"
            className="custom-input w-full"
            name="projectName"
            value={data.projectName}
            onChange={handleData}
            placeholder="Project Name"
          />
        </div>
        <button
          type="submit"
          className={`btn ${
            isLoading ? "btn-disable" : "btn-neutral"
          } text-xs mt-10 w-52 mx-auto`}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit Contract"}
        </button>
      </form>
    </div>
  );
};

export default CreateContracts;
