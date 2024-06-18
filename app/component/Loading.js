import React from "react";
import { Loader } from "react-feather";

const Loading = () => {
  return (
    <div className="font-bold text-sm text-primary border border-zinc-300 rounded-lg flex p-5 gap-3 max-w-60 mx-auto">
      <Loader className="animate-spin"/> Loading...
    </div>
  );
};

export default Loading;
