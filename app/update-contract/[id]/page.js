"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { errorToast } from "@/config/toast";
import { useRouter } from "next/navigation";
import Loading from "@/app/component/Loading";

const UpdateContract = (params) => {
  const id = params.params.id;
  const router = useRouter();
  const [data, setData] = useState({
    contractID: "",
    projectName: "",
    batch: "",
    status: "",
    contractAmount: "",
    contractor: "",
    posting: "",
    preBid: "",
    bidding: "",
    noa: "",
    ntp: "",
    contract: "",
    ntpRecieve: "",
    submittedDocuments: {
      pertCPM: false,
      freeClean: false,
      busPermit: false,
      mayorPermit: false,
      bonds: false,
      cari: false,
    },
    isDocComplete: null,
    lastUpdated: "",
  });
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

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      submittedDocuments: {
        ...prevData.submittedDocuments,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data :>> ", data);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/update-contract`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      errorToast(`Error updating contract: ${error.message}`);
      setIsLoading(false);
    }
  };
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col w-screen p-10 justify-center">
      <ToastContainer />
      {isLoading ? (
        <Loading />
      ) : (
        <form className="flex flex-col gap-8 min-w-[60rem] mx-auto">
          <span className="gap-3 w-[15rem] flex">
            <h2 className="font-bold text-zinc-600 text-lg my-auto">{data?.contractID}</h2>
            <div className="border px-4 flex py-1 text-[0.7rem] text-center border-primary text-primary font-bold rounded-md">
              {data?.status}
            </div>
          </span>
          {/* advertisement date */}
          <div className="flex gap-10">
            <span className="gap-2 flex flex-col">
              <p className="primary-text ml-1">Posting Date: </p>
              <input
                name="posting"
                className="custom-input w-52"
                type="date"
                value={data?.posting?.split("T")[0] || ""}
                onChange={handleData}
              />
            </span>

            <span className="gap-2 flex flex-col">
              <p className="primary-text ml-1">Pre Bid Date: </p>
              <input
                name="preBid"
                className="custom-input w-52"
                type="date"
                value={data?.preBid?.split("T")[0] || ""}
                onChange={handleData}
              />
            </span>
            <span className="gap-2 flex flex-col">
              <p className="primary-text ml-1">Bidding Date: </p>
              <input
                name="bidding"
                className="custom-input w-52"
                type="date"
                value={data?.bidding?.split("T")[0] || ""}
                onChange={handleData}
              />
            </span>

            <span className="gap-2 flex flex-col">
              <p className="primary-text ml-1">Batch NO: </p>
              <input
                name="batch"
                value={data?.batch}
                className="custom-input w-52"
                type="text"
                onChange={handleData}
              />
            </span>
          </div>
          {/* name */}
          <div className="flex gap-10">
            <input
              type="text"
              autoComplete="off"
              className="custom-input w-full"
              name="projectName"
              placeholder="Project Name"
              value={data?.projectName}
              onChange={handleData}
            />
          </div>
          {/* award date */}
          <div className="flex gap-10">
            <span className="gap-2 flex flex-col">
              <p className="primary-text ml-1">Award Date: </p>
              <input
                name="noa"
                className="custom-input w-52"
                type="date"
                value={data?.noa?.split("T")[0] || ""}
                onChange={handleData}
              />
            </span>

            <span className="gap-2 flex flex-col">
              <p className="primary-text ml-1">Proceed Date: </p>
              <input
                name="ntp"
                className="custom-input w-52"
                type="date"
                value={data?.ntp?.split("T")[0] || ""}
                onChange={handleData}
              />
            </span>
            <span className="gap-2 flex flex-col">
              <p className="primary-text ml-1">NTP Recieve Date: </p>
              <input
                name="ntpRecieve"
                className="custom-input w-52"
                type="date"
                value={data?.ntpRecieve?.split("T")[0] || ""}
                onChange={handleData}
              />
            </span>

            <span className="gap-2 flex flex-col">
              <p className="primary-text ml-1">Contract Date: </p>
              <input
                name="contract"
                className="custom-input w-52"
                type="date"
                value={data?.contract?.split("T")[0] || ""}
                onChange={handleData}
              />
            </span>
          </div>
          {/* submitted documents */}
          <div className="flex flex-col gap-5 mt-5">
            <p className="primary-text ml-1">Submitted Documents:</p>
            <div className="flex flex-wrap gap-8">
              <label className="check-label">
                <input
                  type="checkbox"
                  name="pertCPM"
                  checked={data?.submittedDocuments?.pertCPM}
                  onChange={handleCheckboxChange}
                />
                <span>PERT/CPM</span>
              </label>
              <label className="check-label">
                <input
                  type="checkbox"
                  name="freeClean"
                  checked={data?.submittedDocuments?.freeClean}
                  onChange={handleCheckboxChange}
                />
                <span>Free & Clean</span>
              </label>
              <label className="check-label">
                <input
                  type="checkbox"
                  name="busPermit"
                  checked={data?.submittedDocuments?.busPermit}
                  onChange={handleCheckboxChange}
                />
                <span>Business Permit</span>
              </label>
              <label className="check-label">
                <input
                  type="checkbox"
                  name="mayorPermit"
                  checked={data?.submittedDocuments?.mayorPermit}
                  onChange={handleCheckboxChange}
                />
                <span>Mayors Permit</span>
              </label>
              <label className="check-label">
                <input
                  type="checkbox"
                  name="bonds"
                  checked={data?.submittedDocuments?.bonds}
                  onChange={handleCheckboxChange}
                />
                <span>Bonds</span>
              </label>
              <label className="check-label">
                <input
                  type="checkbox"
                  name="cari"
                  checked={data?.submittedDocuments?.cari}
                  onChange={handleCheckboxChange}
                />
                <span>CARI</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className={`btn ${
              isLoading ? "btn-disable" : "btn-neutral"
            } text-xs mt-10 w-52 mx-auto`}
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "Loading..." : "Update Contract"}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateContract;
