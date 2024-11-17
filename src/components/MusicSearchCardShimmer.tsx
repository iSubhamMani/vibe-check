import React from "react";

const MusicSearchCardShimmer = () => {
  return (
    <div className="rounded-md px-2 py-2 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-12 h-10 rounded-md bg-gray-300"></div>
        <div className="flex flex-col gap-2 w-full">
          <div className="w-2/3 h-3 bg-gray-300 rounded-md"></div>
          <div className="w-1/2 h-3 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default MusicSearchCardShimmer;
