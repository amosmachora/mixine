import React from "react";
import { Skeleton } from "./ui/skeleton";

export const TracksSkeleton = () => {
  return (
    <>
      {Array.from({ length: 12 }, (_, i) => i + 1).map((i) => (
        <div className="flex justify-between items-center my-3" key={i}>
          <div className="flex items-center">
            <Skeleton className="h-2 w-2 mx-2" />
            <Skeleton className="w-10 h-10 mr-5 rounded" />
          </div>
          <div className="w-1/4">
            <Skeleton className="h-2 w-full mb-2" />
            <Skeleton className="h-2 w-full" />
          </div>
          <Skeleton className="h-2 w-1/4" />
          <Skeleton className="h-2 w-5" />
        </div>
      ))}
    </>
  );
};
