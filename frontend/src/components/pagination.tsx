import { cn } from '@/lib/utils'

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  className?: string;
}

export function Pagination({
  totalPages,
  currentPage,
  paginate,
  className
}: PaginationProps) {
  return (
    <PaginationRoot className={cn(`justify-end mt-4`, className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};