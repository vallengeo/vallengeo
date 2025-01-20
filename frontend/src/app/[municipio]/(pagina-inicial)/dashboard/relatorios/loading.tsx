import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Skeleton className="w-[154px] h-8" />
        <Skeleton className="w-[154px] h-[62px]" />
      </div>

      <Skeleton className="w-full h-[290px] rounded-3xl mt-6" />
    </div>
  )
}
