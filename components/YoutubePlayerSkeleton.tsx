import React from "react";
import { Skeleton } from "./ui/skeleton";

export const YoutubePlayerSkeleton = () => {
  return (
    <>
      <Skeleton className="w-11/12 mx-auto h-[40vh]" />
      <div className="mx-auto">
        <Skeleton className="w-11/12 h-4 rounded-full" />
        <Skeleton className="w-full h-4 rounded-full mt-6" />
        <Skeleton className="w-full h-10 rounded-full" />
      </div>
    </>
  );
};
