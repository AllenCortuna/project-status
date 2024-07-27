import React from "react";
import { format } from "date-fns";

const ContractDetails = ({ contract, handleClose }) => {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 w-full h-full bg-zinc-800 bg-opacity-50 py-6 flex p-4 flex-col justify-center sm:py-12 gap-4 z-50">
      <div className="flex flex-col gap-14 w-[54rem] mx-auto shadow-2xl bg-white rounded-xl p-5 px-8 relative border">
        <span className="gap-3 w-[15rem] flex z-50">
          <h2 className="font-bold text-zinc-600 text-lg my-auto">
            {contract?.contractID}
          </h2>
          <div className="border px-4 flex py-1 text-[0.7rem] text-center border-primary text-primary font-bold rounded-md">
            {contract?.status}
          </div>
        </span>

        {/* name */}
        <div
          className="flex -mt-10 text-left tooltip tooltip-top hover:cursor-pointer"
          contract-tip="Click to copy."
          onClick={() => navigator.clipboard.writeText(contract.projectName)}
        >
          <span className="gap-2 flex flex-col">
            <span className="text-xs text-zinc-500">
              {contract?.projectName || "N/A"}
            </span>
          </span>
        </div>

        {/* advertisement date */}
        <div className="flex gap-20">
          <span className="gap-2 flex flex-col">
            <p className="primary-text">Posting Date: </p>
            <span className="text-normal text-zinc-600 font-bold">
              {contract?.posting
                ? format(new Date(contract?.posting), "MMM d, yyyy")
                : "N/A"}
            </span>
          </span>

          <span className="gap-2 flex flex-col">
            <p className="primary-text">Pre Bid Date: </p>
            <span className="text-normal text-zinc-600 font-bold">
              {contract?.preBid
                ? format(new Date(contract?.preBid), "MMM d, yyyy")
                : "N/A"}
            </span>
          </span>
          <span className="gap-2 flex flex-col">
            <p className="primary-text">Bidding Date: </p>
            <span className="text-normal text-zinc-600 font-bold">
              {contract?.bidding
                ? format(new Date(contract?.bidding), "MMM d, yyyy")
                : "N/A"}
            </span>
          </span>

          <span className="gap-2 flex flex-col">
            <p className="primary-text">Batch NO: </p>
            <span className="text-normal text-zinc-600 font-bold">
              {contract?.batch || "N/A"}
            </span>
          </span>
        </div>
        {/* evaluation */}
        <div className="flex gap-20">
          {/* Bid Evaluation */}
          <div className="flex flex-col gap-2 rounded-md">
            <p className="primary-text">Bid Evaluation Date: </p>
            <div className="flex gap-8">
              <span className="gap-2 flex flex-col">
                <p className="primary-text">From: </p>
                <span className="text-sm text-zinc-600 font-bold">
                  {contract?.bidEvalStart
                    ? format(new Date(contract?.bidEvalStart), "MMM d, yyyy")
                    : "N/A"}
                </span>
              </span>
              <span className="gap-2 flex flex-col">
                <p className="primary-text">To: </p>
                <span className="text-sm text-zinc-600 font-bold">
                  {contract?.bidEvalEnd
                    ? format(new Date(contract?.bidEvalEnd), "MMM d, yyyy")
                    : "N/A"}
                </span>
              </span>
            </div>
          </div>
          {/* Post Qualification */}
          <div className="flex flex-col gap-2 rounded-md">
            <p className="primary-text">Post Qualification Date: </p>
            <div className="flex gap-8">
              <span className="gap-2 flex flex-col">
                <p className="primary-text">From: </p>
                <span className="text-sm text-zinc-600 font-bold">
                  {contract?.postQualStart
                    ? format(new Date(contract?.postQualStart), "MMM d, yyyy")
                    : "N/A"}
                </span>
              </span>
              <span className="gap-2 flex flex-col">
                <p className="primary-text">To: </p>
                <span className="text-sm text-zinc-600 font-bold">
                  {contract?.postQualEnd
                    ? format(new Date(contract?.postQualEnd), "MMM d, yyyy")
                    : "N/A"}
                </span>
              </span>
            </div>
          </div>
          {/* Resolution */}
          <span className="gap-2 flex flex-col">
            <p className="primary-text">Reso Date: </p>
            <span className="text-normal text-zinc-600 font-bold">
              {contract?.reso
                ? format(new Date(contract?.reso), "MMM d, yyyy")
                : "N/A"}
            </span>
          </span>
        </div>

        {/* award date */}
        <div className="flex gap-20">
          <span className="gap-2 flex flex-col">
            <p className="primary-text">Award Date: </p>
            <span className="text-normal text-zinc-600 font-bold">
              {contract?.noa
                ? format(new Date(contract?.noa), "MMM d, yyyy")
                : "N/A"}
            </span>
          </span>

          <span className="gap-2 flex flex-col">
            <p className="primary-text">Proceed Date: </p>
            <span className="text-normal text-zinc-600 font-bold">
              {contract?.ntp
                ? format(new Date(contract?.ntp), "MMM d, yyyy")
                : "N/A"}
            </span>
          </span>
          <span className="gap-2 flex flex-col">
            <p className="primary-text">NTP Recieve Date: </p>
            <span className="text-normal text-zinc-600 font-bold">
              {contract?.ntpRecieve
                ? format(new Date(contract?.ntpRecieve), "MMM d, yyyy")
                : "N/A"}
            </span>
          </span>

          <span className="gap-2 flex flex-col">
            <p className="primary-text">Contract Date: </p>
            <span className="text-normal text-zinc-600 font-bold">
              {contract?.contract
                ? format(new Date(contract?.contract), "MMM d, yyyy")
                : "N/A"}
            </span>
          </span>
        </div>
        {/* contractor */}
        <div className="flex gap-20">
          <span className="gap-2 flex flex-col">
            <p className="primary-text">Contract Amount: </p>
            <span className="text-normal text-zinc-600 font-bold">
              {contract?.contractAmount ? (
                <span className="tracking-tight">
                  {" "}
                  <span className="text-xs mr-2">&#8369;</span>
                  {contract.contractAmount.toLocaleString()}{" "}
                </span>
              ) : (
                "N/A"
              )}
            </span>
          </span>
          <span className="gap-2 flex flex-col">
            <p className="primary-text">Contractor Name: </p>
            <span className="text-normal text-zinc-600 font-bold">
              {contract?.contractor || "N/A"}
            </span>
          </span>
        </div>
        {/* other info */}
        <div className="flex gap-20">
          <span className="gap-2 flex flex-col">
            <p className="primary-text">Last Update: </p>
            <span className="text-normal text-zinc-600 font-bold">
              {contract?.lastUpdated
                ? format(new Date(contract?.lastUpdated), "MMM d, yyyy")
                : "N/A"}
            </span>
          </span>
        </div>
        <button
          className="btn btn-xs text-white btn-error px-3 rounded-3xl custom-shadow absolute top-5 right-5"
          onClick={() => handleClose()}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default ContractDetails;
