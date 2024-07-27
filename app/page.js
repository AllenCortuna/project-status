"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AwardTable from "./component/AwardTable";
import Loading from "./component/Loading";
import IncompleteTable from "./component/IncompleteTable";
import ActiveTable from "./component/ActiveTable";
import NoResult from "./component/NoResult";

const Home = () => {
  const [data, setData] = useState([]);
  const [table, setTable] = useState("award");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by verifying the token in local storage
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, [isLogin]);

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

  const renderTable = () => {
    switch (table) {
      case "active":
        return data?.posted > 0 ? (
          <ActiveTable data={data?.activeList} isLogin={isLogin} />
        ) : (
          <NoResult text={"List of Posted Contracts"} />
        );
      case "award":
        return data?.awarded > 0 ? (
          <AwardTable data={data?.awardedList} isLogin={isLogin} />
        ) : (
          <NoResult text={"Contracts without NTP"} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 p-10">
      <div className="stats border-2 border-zinc-300">
        <button
          className={`stat ${table == "active" && "bg-primary"}`}
          onClick={() => setTable("active")}
        >
          <div
            className={`stat-value flex gap-3 items-center ${
              table == "active" ? "text-white" : "text-primary"
            }`}
          >
            {data?.posted || "0"}
            <span
              className={`stat-title text-xs font-bold my-auto ${
                table == "active" ? "text-white" : "text-primary"
              } `}
            >
              Posted
            </span>
          </div>
          <div
            className={`stat-desc text-[0.7rem] ${
              table == "active" && "text-zinc-200"
            } `}
          >
            Contract posted with no Award
          </div>
        </button>

        <button
          className={`stat ${table == "award" && "bg-primary"}`}
          onClick={() => setTable("award")}
        >
          <div
            className={`stat-value flex gap-3 items-center ${
              table == "award" ? "text-white" : "text-primary"
            }`}
          >
            {data?.awarded || "0"}
            <span
              className={`stat-title text-xs font-bold my-auto ${
                table == "award" ? "text-white" : "text-primary"
              } `}
            >
              Awarded
            </span>
          </div>
          <div
            className={`stat-desc text-[0.7rem] ${
              table == "award" && "text-zinc-200"
            } `}
          >
            Total contract(s) without NTP
          </div>
        </button>

      </div>
      {isLoading && <Loading />}
      {error && <div className="text-red-500">Error: {error.message}</div>}
      {renderTable()}
    </div>
  );
};

export default Home;
