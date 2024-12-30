import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      <Skeleton className="w-[274px] h-[50px] mx-auto" />
      <Skeleton className="sm:max-w-[200px] h-12 mx-auto" />
      <Skeleton className="w-full h-[288px]" />
      <Skeleton className="w-full h-10" />
    </div>
  );
}
