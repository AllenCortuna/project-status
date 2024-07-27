"use client";
import Link from "next/link";
import React, { useState } from "react";
import ContractDetails from "./ContractDetails";
import ContractTable from "./ContractTable";

const ActiveTable = ({ data, isLogin }) => {
  const [contract, setContract] = useState(null);
  const handleDetails = (info) => {
    setContract(info);
  };
  const handleClose = () => {
    setContract(null);
  };

  return (
    <div className="flex justify-center flex-col gap-5 mx-auto">
      {contract && (
        <ContractDetails contract={contract} handleClose={handleClose} />
      )}
      <ContractTable
        data={data}
        isLogin={isLogin}
        handleDetails={handleDetails}
      />
    </div>
  );
};

export default ActiveTable;
