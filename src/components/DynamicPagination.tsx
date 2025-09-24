// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "./ui/pagination";

// interface DynamicPaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// const DynamicPagination = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }: DynamicPaginationProps) => {
//   return (
//     <Pagination>
//       <PaginationContent>
//         {/* Prev */}
//         <PaginationItem>
//           <PaginationPrevious
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               if (currentPage > 1) onPageChange(currentPage - 1);
//             }}
//             className={
//               currentPage === 1 ? "pointer-events-none opacity-50" : ""
//             }
//           />
//         </PaginationItem>

//         {/* Page Numbers */}
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//           <PaginationItem key={page}>
//             <PaginationLink
//               href="#"
//               isActive={page === currentPage}
//               onClick={(e) => {
//                 e.preventDefault();
//                 onPageChange(page);
//               }}
//             >
//               {page}
//             </PaginationLink>
//           </PaginationItem>
//         ))}

//         {/* Next */}
//         <PaginationItem>
//           <PaginationNext
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               if (currentPage < totalPages) onPageChange(currentPage + 1);
//             }}
//             className={
//               currentPage === totalPages ? "pointer-events-none opacity-50" : ""
//             }
//           />
//         </PaginationItem>
//       </PaginationContent>
//     </Pagination>
//   );
// };

// export default DynamicPagination;

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  currentPage: number;
  totalPages: number;
  totalCount?: number;
  onPageChange: (page: number) => void;
  maxVisible?: number; // how many page numbers to show
};

function DynamicPagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
}: Props) {
  // 🔹 Helper to generate pages with ellipsis
  const getPaginationPages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const half = Math.floor(maxVisible / 2);
      let start = Math.max(2, currentPage - half);
      let end = Math.min(totalPages - 1, currentPage + half);

      pages.push(1); // first page

      if (start > 2) pages.push("...");

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < totalPages - 1) pages.push("...");

      pages.push(totalPages); // last page
    }

    return pages;
  };

  return (
    <div className="flex flex-col gap-2">
      <Pagination>
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {/* Page Numbers */}
          {getPaginationPages().map((page, idx) =>
            page === "..." ? (
              <PaginationEllipsis key={"ellipsis" + idx} />
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default DynamicPagination;
