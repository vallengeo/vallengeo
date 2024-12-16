import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <Skeleton className="w-full h-[145px] rounded-2xl" />
      <Skeleton className="w-full h-[355px] rounded-2xl" />
      <Skeleton className="w-full h-[355px] rounded-2xl" />
    </div>
  )
}
