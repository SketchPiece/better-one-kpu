import { Skeleton } from "./ui/skeleton";

interface ServiceCardSkeletonProps {
  amount?: number;
}
export default function ServiceCardSkeleton({
  amount = 1,
}: ServiceCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: amount }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-center gap-4 rounded-xl px-8 py-6"
        >
          <Skeleton className="h-20 w-20 rounded-full border border-[#F0F0F0]" />
          <div className="flex flex-1 flex-col">
            <Skeleton className="h-7 w-full max-w-36" />
            <Skeleton className="mt-1 h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-full" />
          </div>
        </div>
      ))}
    </>
  );
}
