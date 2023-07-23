import React from "react";
import { Skeleton } from "./ui/skeleton";

export const YoutubePlayerSkeleton = () => {
  return (
    <div className="p-5">
      <Skeleton className="w-full aspect-video mx-auto" />
      <div className="mx-auto">
        <Skeleton className="w-full h-4 rounded mt-5" />
        <Skeleton className="w-1/4 h-4 rounded mt-6" />
        <Skeleton className="w-full h-10 rounded mt-5" />
      </div>
    </div>
  );
};
