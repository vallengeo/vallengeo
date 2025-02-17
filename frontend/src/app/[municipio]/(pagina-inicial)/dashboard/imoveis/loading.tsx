import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center justify-between flex-wrap gap-6">
        <div className="space-y-1.5">
          <Skeleton className="w-[120px] h-8" />
          <Skeleton className="w-[160px] h-8" />
        </div>

        <Skeleton className="w-[132px] h-[62px]" />
      </div>

      <Skeleton className="w-full h-[440px] rounded-3xl" />
      <Skeleton className="w-full h-[440px] rounded-3xl" />
    </div>
  )
}
