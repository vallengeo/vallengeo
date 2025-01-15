import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <Skeleton className="w-[274px] h-[50px]" />
      <Skeleton className="w-full h-12 mx-auto mt-8 mb-6" />
      <Skeleton className="w-full h-[100px] mb-2" />
      <Skeleton className="w-[140px] h-12 ml-auto mt-4 mb-6" />
      <Skeleton className="w-full h-10" />
    </div>
  );
}
