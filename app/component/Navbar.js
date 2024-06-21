import Image from "next/image";
import Link from "next/link";
import React from "react";
import dpwhLogo from '../../public/dpwhLogo.png'
import { Search } from "react-feather";
export const Navbar = () => {
  return (
    <div className="navbar bg-base-100 px-20 bg-zinc-200">
      <div className="flex-1">
        <Link href={"/"} className={`text-md font-[600] text-zinc-600 flex gap-5`}>
          <Image src={dpwhLogo} alt="DPWH Logo.png"  width={40} height={40}/>
          <b className="text-orange-500 my-auto">PMIS</b>
        </Link>
      </div>
      <div className="flex-none">
        <button className="btn btn-outline btn-sm text-xs text-primary font-bold rounded-md pr-7 mr-5 flex gap-3">
          <Search size={15}/>
        <Link href={"/search-contracts"} className="my-auto">search</Link>
        </button>
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
                  <Link href={"/login"}>Login</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};
