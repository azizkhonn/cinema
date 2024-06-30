/* eslint-disable react/prop-types */

import './Pagination.css'

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  const maxPageNumbersToShow = 5;
  const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

  let startPage = currentPage - halfMaxPageNumbersToShow;
  let endPage = currentPage + halfMaxPageNumbersToShow;

  if (startPage <= 0) {
    startPage = 1;
    endPage = Math.min(maxPageNumbersToShow, totalPages);
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button id='changeBtn'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pageNumbers.map(number => (
        <button
        id='changeBtnNum'
          key={number}
          onClick={() => onPageChange(number)}
          className={  currentPage === number ? 'active' : 'red'}
        >
          {number}
        </button>
      ))}
      <button
        id='nextBtn'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next 
      </button>
    </div>
  );
}

export default Pagination;
