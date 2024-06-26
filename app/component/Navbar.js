"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import dpwhLogo from "../../public/dpwhLogo.png";
import { userStore } from "@/state/user";

export const Navbar = () => {
  const isLogin = userStore((state) => state.isLogin);
  const setIsLogin = userStore((state) => state.setIsLogin);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in by verifying the token in local storage
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
    <div className="navbar bg-base-100 px-20 bg-zinc-200">
      <div className="flex-1">
        <Link
          href={"/"}
          className={`text-md font-[600] text-zinc-600 flex gap-5`}
        >
          <Image src={dpwhLogo} alt="DPWH Logo" width={40} height={40} />
          <b className="text-orange-500 my-auto">PMIS</b>
        </Link>
      </div>
      <div className="flex-none">
        <Link
          href={"/search-contracts"}
          className="my-auto btn btn-outline btn-sm text-xs text-zinc-600 rounded-full mr-5 flex w-24"
        >
          search
        </Link>
        <ul className="menu menu-horizontal px-1 text-xs">
          <li>
            <details>
              <summary className="border hover:border-zinc-700">Menu</summary>
              <ul className="p-2 bg-base-100 rounded-t-none w-auto primary-text text-xs border border-zinc-300 ">
                <li>
                  <Link href={"/"}>Dashboard</Link>
                </li>
                <li>
                  <Link href={"/create-contract"}>Upload</Link>
                </li>
                <li>
                  {isLogin ? (
                    <button onClick={handleLogout}>Logout</button>
                  ) : (
                    <Link href={"/login"}>Login</Link>
                  )}
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};
