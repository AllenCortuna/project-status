"use client";
import { errorToast, successToast } from "@/config/toast";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import query from "../../public/img/Query-Insight.svg";

const CreateContracts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [data, setData] = useState({
    batch: "",
    contractID: "",
    projectName: "",
    posting: "",
    preBid: "",
    bidding: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, [isLogin]);

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
    if (Object.values(data).some((value) => value === "")) {
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
          posting: data.posting,
          preBid: data.preBid,
          bidding: data.bidding,
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
      {isLogin ? (
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
      ) : (
        <div className="w-[30rem] flex justify-center mx-auto items-center flex-col mt-10 gap-8">
          <p className="text-xs font-bold px-5 text-primary border rounded-lg p-3 border-primary">
            Unathorized User
          </p>
          <Image src={query} alt="Query Logo.png" width={300} />
          <Link className="btn rounded-full btn-neutral text-xs w-28 mx-auto" href={"/login"}>Login</Link>
        </div>
      )}
    </div>
  );
};

export default CreateContracts;
