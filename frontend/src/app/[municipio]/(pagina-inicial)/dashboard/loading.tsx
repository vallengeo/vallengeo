import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="w-[90px] h-8" />
        <Skeleton className="w-[132px] h-[62px]" />
      </div>

      <div className="flex gap-6 flex-col md:flex-row">
        <Skeleton className="w-full h-[185px] rounded-3xl" />
        <Skeleton className="w-full md:max-w-[380px] h-[185px] rounded-3xl" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Skeleton className="w-full h-[158px] rounded-3xl" />
        <Skeleton className="w-full h-[158px] rounded-3xl" />
        <Skeleton className="w-full h-[158px] rounded-3xl" />
        <Skeleton className="w-full h-[158px] rounded-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="w-full h-[228px] rounded-3xl" />
        <Skeleton className="w-full h-[228px] rounded-3xl" />
      </div>

      <Skeleton className="w-full h-[440px] rounded-3xl" />
      <Skeleton className="w-full h-[440px] rounded-3xl" />
    </div>
  );
}
