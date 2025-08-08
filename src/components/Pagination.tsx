import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    searchParams.set("page", currentPage);
    setSearchParams(searchParams, { replace: true });
  }, [currentPage, setSearchParams, searchParams]);

  const pagesToShow = 2;
  const minimumPages = Math.floor(pagesToShow / 2);

  const getVisiblePages = () => {
    let start = Math.max(1, currentPage - minimumPages);
    let end = Math.min(totalPages, currentPage + minimumPages);

    if (currentPage - minimumPages < 1) {
      end = Math.min(totalPages, end + (minimumPages - currentPage + 1));
    }
    if (currentPage + minimumPages > totalPages) {
      start = Math.max(1, start - (currentPage + minimumPages - totalPages));
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-row gap-3 p-2">
      {/* Prev Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        className={`px-2 py-1 ${
          currentPage === 1
            ? "cursor-not-allowed text-gray-400"
            : "hover:text-yellow"
        }`}
      >
        Prev
      </button>

      {/* First Page & Dots */}
      {currentPage > minimumPages + 1 && (
        <>
          <button onClick={() => handlePageChange(1)} className="px-2 py-1">
            1
          </button>
          <span>...</span>
        </>
      )}

      {/* Dynamic Page Numbers */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => currentPage !== page && handlePageChange(page)}
          className={`rounded px-2 py-1 ${
            currentPage === page ? "bg-yellow text-white" : "hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last Page & Dots */}
      {currentPage < totalPages - minimumPages && (
        <>
          <span>...</span>
          <button
            onClick={() => handlePageChange(totalPages)}
            className="px-2 py-1"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          currentPage < totalPages && handlePageChange(currentPage + 1)
        }
        className={`px-2 py-1 ${
          currentPage === totalPages
            ? "cursor-not-allowed text-gray-400"
            : "hover:text-yellow"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
