"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import Loading from "@/app/component/Loading";
import { format } from "date-fns";

const ContractInfo = (params) => {
  const id = params.params.id;
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("id", id);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/get-contract`,
          { id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response", response);
        setData(response.data.result);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col w-screen p-10 justify-center">
      <ToastContainer />
      {isLoading ? (
        <Loading />
      ) : (
        <span className="flex flex-col gap-14 w-[50rem] mx-auto">
          <span className="gap-3 w-[15rem] flex">
            <h2 className="font-bold text-zinc-600 text-lg my-auto">
              {data?.contractID}
            </h2>
            <div className="border px-4 flex py-1 text-[0.7rem] text-center border-primary text-primary font-bold rounded-md">
              {data?.status}
            </div>
          </span>

          {/* name */}
          <div className="flex -mt-10">
            <span className="gap-2 flex flex-col">
              <span className="text-xs text-zinc-500">
                {data?.projectName || "N/A"}
              </span>
            </span>
          </div>

          {/* advertisement date */}
          <div className="flex gap-20">
            <span className="gap-2 flex flex-col">
              <p className="primary-text">Posting Date: </p>
              <span className="text-normal text-zinc-600 font-bold">
                {data?.posting ? format(new Date(data?.posting), "MMM d,yyyy") : "N/A"}
              </span>
            </span>

            <span className="gap-2 flex flex-col">
              <p className="primary-text">Pre Bid Date: </p>
              <span className="text-normal text-zinc-600 font-bold">
                {data?.preBid ? format(new Date(data?.preBid), "MMM d,yyyy") : "N/A"}
              </span>
            </span>
            <span className="gap-2 flex flex-col">
              <p className="primary-text">Bidding Date: </p>
              <span className="text-normal text-zinc-600 font-bold">
                {data?.bidding ? format(new Date(data?.bidding), "MMM d,yyyy") : "N/A"}
              </span>
            </span>

            <span className="gap-2 flex flex-col">
              <p className="primary-text">Batch NO: </p>
              <span className="text-normal text-zinc-600 font-bold">
                {data?.batch || "N/A"}
              </span>
            </span>
          </div>
          {/* award date */}
          <div className="flex gap-20">
            <span className="gap-2 flex flex-col">
              <p className="primary-text">Award Date: </p>
              <span className="text-normal text-zinc-600 font-bold">
                {data?.noa ? format(new Date(data?.noa), "MMM d,yyyy") : "N/A"}
              </span>
            </span>

            <span className="gap-2 flex flex-col">
              <p className="primary-text">Proceed Date: </p>
              <span className="text-normal text-zinc-600 font-bold">
                {data?.ntp ? format(new Date(data?.ntp), "MMM d,yyyy") : "N/A"}
              </span>
            </span>
            <span className="gap-2 flex flex-col">
              <p className="primary-text">NTP Recieve Date: </p>
              <span className="text-normal text-zinc-600 font-bold">
                {data?.ntpRecieve ? format(new Date(data?.ntpRecieve), "MMM d,yyyy") : "N/A"}
              </span>
            </span>

            <span className="gap-2 flex flex-col">
              <p className="primary-text">Contract Date: </p>
              <span className="text-normal text-zinc-600 font-bold">
                {data?.contract ? format(new Date(data?.contract), "MMM d,yyyy") : "N/A"}
              </span>
            </span>
          </div>
          {/* contractor */}
          <div className="flex gap-10">
            <span className="gap-2 flex flex-col">
              <p className="primary-text">Contractor Name: </p>
              <span className="text-normal text-zinc-600 font-bold">
                {data?.contractor || "N/A"}
              </span>
            </span>
          </div>
           {/* other info */}
           <div className="flex gap-20">
            <span className="gap-2 flex flex-col">
              <p className="primary-text">Last Update: </p>
              <span className="text-normal text-zinc-600 font-bold">
                {data?.lastUpdated ? format(new Date(data?.lastUpdated), "MMM d,yyyy") : "N/A"}
              </span>
            </span>

          </div>
         
        </span>
      )}
    </div>
  );
};

export default ContractInfo;
