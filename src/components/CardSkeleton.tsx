import { Skeleton } from "./ui/skeleton";

interface CardSkeletonProps {
  type: "card" | "details";
}

export const CardSkeleton = ({ type = "card" }: CardSkeletonProps) => {
  return (
    <>
      {type === "card" ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[150x]" />
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[150x]" />
          </div>
        </div>
      )}
    </>
  );
};
