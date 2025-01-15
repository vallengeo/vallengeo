import { Avatar } from "./avatar";

import { cn } from "@/lib/utils";

interface ProfileProps {
  className?: string;
}

export function ProfileTrigger({ className = "" }: ProfileProps) {
  return (
    <div
      className={cn("flex justify-center items-center space-x-1", className)}
    >
      <Avatar width={32} height={30} />
      <div className="flex flex-col text-white text-left">
        <strong className="text-xs">João Silva</strong>
        <span className="text-[0.625rem]">Cidadão</span>
      </div>
    </div>
  );
}
