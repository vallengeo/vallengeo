import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center justify-between flex-col md:flex-row flex-wrap gap-6">
        <Skeleton className="w-[166px] h-8" />
        <Skeleton className="w-[132px] h-[62px]" />
      </div>

      <Skeleton className="w-full h-[440px] rounded-3xl" />
      <Skeleton className="w-full h-[440px] rounded-3xl" />
    </div>
  )
}
