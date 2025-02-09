import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container space-y-6 pb-6">
      <div className="flex items-start md:items-center flex-col md:flex-row justify-between gap-6">
        <div className="space-y-2">
          <Skeleton className="w-[320px] h-8" />
          <Skeleton className="w-[320px] h-6" />
        </div>

        <Skeleton className="w-[132px] h-[62px]" />
      </div>

      <div className="space-y-6">
        <Skeleton className="w-full h-24 rounded-3xl" />
        <Skeleton className="w-full h-36 rounded-3xl" />
        <Skeleton className="w-full h-[150px] rounded-3xl" />
        <Skeleton className="w-full h-[300px] rounded-3xl" />
        <Skeleton className="w-full h-36 rounded-3xl" />
        <Skeleton className="w-full h-[160px] rounded-3xl" />
        <Skeleton className="w-full h-[455px] rounded-3xl" />
        <Skeleton className="w-full h-24 rounded-3xl" />
        <Skeleton className="w-full h-[300px] rounded-3xl" />
        <Skeleton className="w-full h-[300px] rounded-3xl" />
        <Skeleton className="w-full h-[400px] rounded-3xl" />
      </div>
    </div>
  )
}
