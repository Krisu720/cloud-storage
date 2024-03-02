import { FC } from "react";
import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="px-2 md:px-0">
      <Skeleton className="flex h-44" />

      <div className="grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 grid-cols-3  gap-2 mt-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
          (_, index) => (
            <Skeleton key={index} className="w-full h-40 shadow rounded" />
          )
        )}
      </div>
    </div>
  );
}
