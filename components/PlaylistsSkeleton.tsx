import React from "react";
import { Skeleton } from "./ui/skeleton";

export const PlaylistsSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-y-5 justify-between mt-5">
      {Array.from({ length: 12 }, (_, i) => i + 1).map((i) => (
        <div
          className="flex flex-col p-4 justify-between w-1/2 sm:w-1/6 gap-y-3 show"
          key={i}
        >
          <Skeleton className="h-[150px] w-full rounded" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-8 w-full" />
        </div>
      ))}
    </div>
  );
};
