"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AwardTable from "./component/AwardTable";
import Loading from "./component/Loading";
import IncompleteTable from "./component/IncompleteTable";

const Home = () => {
  const [data, setData] = useState([]);
  const [table, setTable] = useState("award");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/get-status`
        );
        console.log("response.data.result", response.data.result);
        setData(response.data.result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center gap-10 p-20">
      <div className="stats border-2 border-zinc-300">
        <div className="stat">
          {/* logo goes here */}
          <div className="stat-value text-primary flex gap-3 items-center">
            {data?.posted ? data?.posted : "0"}{" "}
            <span className="stat-title text-xs font-bold my-auto">
              Active PhilGEPs
            </span>
          </div>
          <div className="stat-desc text-[0.7rem]">
            Total contract(s) active in PhilGEPs
          </div>
        </div>
        <button className="stat hover:bg-zinc-300"onClick={()=> setTable("award")}>
          {/* logo goes here */}
          <div className="stat-value text-primary flex gap-3 items-center">
            {data?.awarded ? data?.awarded : "0"}
            <span className="stat-title text-xs font-bold my-auto">
              Awarded
            </span>
          </div>
          <div className="stat-desc text-[0.7rem]">
            Total contract(s) without NTP
          </div>
        </button>
        <button className="stat hover:bg-zinc-300" onClick={()=> setTable("incomplete")}>
          {/* logo goes here */}
          <div className="stat-value text-primary flex gap-3 items-center">
            {data?.incompleteDoc ? data?.incompleteDoc : "0"}
            <span className="stat-title text-xs font-bold my-auto">
              Incomplete Documents
            </span>
          </div>
          <div className="stat-desc text-[0.7rem]">
            Incomplete Pert CPM, Permit etc
          </div>
        </button>
      </div>
      {isLoading ? <Loading/> : null}
      {table == "award" && !isLoading && <AwardTable data={data?.awardedList} /> }
      {table == "incomplete" && !isLoading &&<IncompleteTable data={data?.incompleteDocList} />}
      
    </div>
  );
};

export default Home;
