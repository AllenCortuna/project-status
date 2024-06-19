"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AwardTable from "./component/AwardTable";
import Loading from "./component/Loading";
import IncompleteTable from "./component/IncompleteTable";
import ActiveTable from "./component/ActiveTable";

const Home = () => {
  const [data, setData] = useState([]);
  const [table, setTable] = useState("incomplete");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/get-status`,
          { data: "get-status" },
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
  }, []);


  return (
    <div className="flex min-h-screen flex-col items-center gap-10 p-20">
      <div className="stats border-2 border-zinc-300">
        <button className="stat hover:bg-zinc-300" onClick={() => setTable("active")}>
          <div className="stat-value text-primary flex gap-3 items-center">
            {data?.posted || "0"}
            <span className="stat-title text-xs font-bold my-auto">Posted</span>
          </div>
          <div className="stat-desc text-[0.7rem]">Contract posted with no Award</div>
        </button>

        <button className="stat hover:bg-zinc-300" onClick={() => setTable("award")}>
          <div className="stat-value text-primary flex gap-3 items-center">
            {data?.awarded || "0"}
            <span className="stat-title text-xs font-bold my-auto">Awarded</span>
          </div>
          <div className="stat-desc text-[0.7rem]">Total contract(s) without NTP</div>
        </button>

        <button className="stat hover:bg-zinc-300" onClick={() => setTable("incomplete")}>
          <div className="stat-value text-primary flex gap-3 items-center">
            {data?.incompleteDoc || "0"}
            <span className="stat-title text-xs font-bold my-auto">Incomplete Documents</span>
          </div>
          <div className="stat-desc text-[0.7rem]">Incomplete Pert CPM, Permit etc</div>
        </button>
      </div>
      {isLoading && <Loading />}
      {error && <div className="text-red-500">Error: {error.message}</div>}
      {table === "active" && data?.posted > 0 && <ActiveTable data={data?.activeList} />}
      {table === "award" && data?.awarded > 0 && <AwardTable data={data?.awardedList} />}
      {table === "incomplete" && data?.incompleteDoc > 0 && <IncompleteTable data={data?.incompleteDocList} />}
    </div>
  );
};

export default Home;
