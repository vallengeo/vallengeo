import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <Skeleton className="w-[274px] h-[50px] mx-auto" />

      <div className="mt-8">
        <Skeleton className="w-full h-12 mx-auto" />

        <div className="flex flex-col gap-y-6 w-72 mx-auto mt-10">
          {/* <Skeleton className="w-full h-12" /> */}
          <Skeleton className="w-full h-12" />
        </div>
      </div>
    </div>
  );
}
