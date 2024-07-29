"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import dpwhLogo from "../../public/dpwhLogo.png";
import { userStore } from "@/state/user";

export const Navbar = ({ children }) => {
  const isLogin = userStore((state) => state.isLogin);
  const setIsLogin = userStore((state) => state.setIsLogin);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
    console.log("isLogin :>> ", isLogin);
  }, [isLogin, setIsLogin]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    router.push("/login");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-start gap-0">
      <div className="navbar px-5 bg-zinc-200 border-b z-30 border-zinc-300">
        <div className="flex-1">
          <Link
            href={"/"}
            className={`text-md font-[600] text-zinc-600 flex gap-5`}
          >
            <Image src={dpwhLogo} alt="DPWH Logo" width={40} height={40} />
            <b className="text-orange-500 my-auto">PMIS</b>
          </Link>
        </div>
        <div className="flex gap-3">
          <Link
            href={"/search-contracts"}
            className="nav-btn"
          >
            Search
          </Link>
          <Link
            href={"/bidding"}
            className="nav-btn"
          >
            Bidding
          </Link>
          <Link
            href={"/"}
            className="nav-btn"
          >
            Dashboard
          </Link>
          {isLogin ? (
            <button
              onClick={handleLogout}
              className="nav-btn"
            >
              Logout
            </button>
          ) : (
            <Link
              href={"/login"}
              className="nav-btn"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};
