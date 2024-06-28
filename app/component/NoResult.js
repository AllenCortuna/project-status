import Image from "next/image";
import React from "react";
import conn from '../../public/img/Connection.svg'

const NoResult = ({text}) => {
  return (
    <div className="w-[30rem] flex justify-center items-center flex-col mt-10">
      <Image src={conn} alt="Query Logo.png" width={300} />
      <p className="text-xs font-bold px-5 text-primary border rounded-lg p-3 border-primary">
        {text}
      </p>
    </div>
  );
};

export default NoResult;
