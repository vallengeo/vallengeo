import { Skeleton } from "@/components/ui/skeleton";

export function MenuSkeleton() {
  return (
    <div className="space-y-2.5">
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-9" />
      <Skeleton className="w-full h-9" />
    </div>
  )
}
