import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center justify-between flex-wrap gap-6">
        <div className="space-y-1.5">
          <Skeleton className="w-[166px] h-8" />
          <Skeleton className="w-[340px] h-6" />
        </div>

        <Skeleton className="w-[132px] h-[62px]" />
      </div>

      <Skeleton className="w-full h-[100px] rounded-3xl" />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <Skeleton className="w-full h-[225px] rounded-3xl" />
          <Skeleton className="w-full h-[250px] rounded-3xl" />
        </div>

        <Skeleton className="flex-1 grid min-h-[475px] max-w-[440px] rounded-3xl" />
      </div>
    </div>
  );
}
