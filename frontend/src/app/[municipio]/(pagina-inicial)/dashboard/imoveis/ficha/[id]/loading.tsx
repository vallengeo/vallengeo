import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container flex flex-col gap-y-6 h-full py-6">
      <div className="w-full">
        <Skeleton className="w-36 h-8 rounded-2xl mb-2" />
        <Skeleton className="w-44 h-8 rounded-2xl" />
      </div>

      <div className="flex flex-col gap-y-6 h-full">
        <Skeleton className="w-full h-[100px] rounded-2xl" />
        <Skeleton className="w-full h-full rounded-2xl" />
      </div>
    </div>
  )
}