import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <nav className="pagination-container" aria-label="Навигация по каталогу планет">
      <button
        className="page-btn page-arrow"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        title="Предыдущая страница"
      >
        <ChevronLeft size={18} /> Назад
      </button>

      <div className="page-numbers">
        {pages[0] > 1 && (
          <>
            <button className="page-btn" onClick={() => onPageChange(1)}>
              1
            </button>
            {pages[0] > 2 && <span className="page-dots">...</span>}
          </>
        )}

        {pages.map((pageNum) => (
          <button
            key={pageNum}
            className={`page-btn ${pageNum === currentPage ? "active" : ""}`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}

        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && <span className="page-dots">...</span>}
            <button className="page-btn" onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        className="page-btn page-arrow"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        title="Следующая страница"
      >
        Вперед <ChevronRight size={18} />
      </button>

      <span className="page-summary">
        Стр. {currentPage} из {totalPages}
      </span>
    </nav>
  );
};
