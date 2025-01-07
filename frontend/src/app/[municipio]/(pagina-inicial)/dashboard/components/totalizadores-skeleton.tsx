import { Skeleton } from "@/components/ui/skeleton";

export function TotalizadoresSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <Skeleton className="h-[158px] rounded-3xl" />
      <Skeleton className="h-[158px] rounded-3xl" />
      <Skeleton className="h-[158px] rounded-3xl" />
      <Skeleton className="h-[158px] rounded-3xl" />
    </div>
  );
}
