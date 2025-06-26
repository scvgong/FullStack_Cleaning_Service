const Pagination = ({ page, totalPages, onPageChange }) => {
    const getPageRange = () => {
      const delta = 2;
      const range = [];
  
      const start = Math.max(1, page - delta);
      const end = Math.min(totalPages, page + delta);
  
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      return range;
    };
  
    if (totalPages <= 1) return null;
  
    return (
      <div className="flex items-center justify-center space-x-2 mt-6">
        <button
        onClick={() => onPageChange(1)}
        className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
      >
        &laquo;
      </button>
        {getPageRange().map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded ${
              p === page ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {p}
          </button>
        ))}
        {/* 항상 >> 마지막 페이지 버튼 표시 */}
      <button
        onClick={() => onPageChange(totalPages)}
        className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
      >
        &raquo;
      </button>
      </div>
    );
  };
  
  export default Pagination;
  