import React from "react";
import { Grid } from "react-loader-spinner";

const Loading = () => {
  return (
      <div className="flex flex-col justify-center items-center h-[95vh]">
        <Grid color="rgb(59 130 246)" height={80} width={80} />
        <div className="text-[#333] mt-6 font-poppins font-bold text-2xl">
          Time Lock
        </div>
      </div>
  );
};

export default Loading;
