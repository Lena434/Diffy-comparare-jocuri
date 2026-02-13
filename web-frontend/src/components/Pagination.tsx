interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onGoToPage: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onNextPage, onPreviousPage, onGoToPage }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex justify-center items-center gap-4">
      <button
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
          currentPage === 1
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-neon-purple hover:bg-neon-pink shadow-lg shadow-neon-purple/50 hover:shadow-neon-pink/50'
        }`}
      >
        Previous
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onGoToPage(page)}
            className={`w-12 h-12 rounded-lg font-semibold transition-all ${
              currentPage === page
                ? 'bg-neon-cyan text-black'
                : 'bg-purple-900/40 hover:bg-purple-800/60 text-white'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
          currentPage === totalPages
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-neon-purple hover:bg-neon-pink shadow-lg shadow-neon-purple/50 hover:shadow-neon-pink/50'
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;