import React from "react";

const Evaluation = ({ data, handleData }) => {
  return (
    <div className="flex gap-10">
      {/* Bid Evaluation */}
      <div className="flex flex-col gap-2 p-2 bg-zinc-50 rounded-md">
        <p className="primary-text ml-1">Bid Evaluation Date: </p>
        <div className="flex gap-2">
          <span className="gap-2 flex flex-col">
            <p className="primary-text ml-1">From: </p>
            <input
              name="bidEvalStart"
              className="custom-input w-36"
              type="date"
              value={data?.bidEvalStart?.split("T")[0] || ""}
              onChange={handleData}
            />
          </span>
          <span className="gap-2 flex flex-col">
            <p className="primary-text ml-1">To: </p>
            <input
              name="bidEvalEnd"
              className="custom-input w-36"
              type="date"
              value={data?.bidEvalEnd?.split("T")[0] || ""}
              onChange={handleData}
            />
          </span>
        </div>
      </div>
      {/* Post Qualification */}
      <div className="flex flex-col gap-2  p-2 bg-zinc-50 rounded-md">
        <p className="primary-text ml-1">Post Qualification Date: </p>
        <div className="flex gap-2">
          <span className="gap-2 flex flex-col">
            <p className="primary-text ml-1">From: </p>
            <input
              name="postQualStart"
              className="custom-input w-36"
              type="date"
              value={data?.postQualStart?.split("T")[0] || ""}
              onChange={handleData}
            />
          </span>
          <span className="gap-2 flex flex-col">
            <p className="primary-text ml-1">To: </p>
            <input
              name="postQualEnd"
              className="custom-input w-36"
              type="date"
              value={data?.postQualEnd?.split("T")[0] || ""}
              onChange={handleData}
            />
          </span>
        </div>
      </div>
      {/* Resolution */}
      <span className="gap-2 flex flex-col">
        <p className="primary-text ml-1">Reso Date: </p>
        <input
          name="reso"
          className="custom-input w-52"
          type="date"
          value={data?.reso?.split("T")[0] || ""}
          onChange={handleData}
        />
      </span>
    </div>
  );
};

export default Evaluation;
