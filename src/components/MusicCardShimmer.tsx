import React from "react";

const MusicCardShimmer = () => {
  return (
    <div>
      <div className="flex items-start gap-3 my-4">
        <div className="w-32 h-24 animate-pulse bg-indigo-200 rounded-md"></div>
        <div className="flex flex-col gap-2">
          <span className="w-40 h-4 animate-pulse rounded-md bg-indigo-200"></span>
          <span className="w-36 h-3 animate-pulse rounded-md bg-indigo-200"></span>
        </div>
      </div>
    </div>
  );
};

export default MusicCardShimmer;
