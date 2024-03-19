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
}

export function Pagination({
  totalPages,
  currentPage,
  paginate,
}: PaginationProps) {
  return (
    <PaginationRoot className="justify-end mt-4">
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