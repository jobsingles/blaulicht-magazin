interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 my-12" aria-label="Seitennavigation">
      {currentPage > 1 && (
        <a
          href={currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`}
          className="px-3 py-2 rounded-lg text-sm font-bold text-foreground/60 hover:text-brand-orange transition-colors"
        >
          ←
        </a>
      )}
      {pages.map((page) => (
        <a
          key={page}
          href={page === 1 ? basePath : `${basePath}?page=${page}`}
          className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
            page === currentPage
              ? 'bg-brand-orange text-white'
              : 'text-foreground/60 hover:text-brand-orange'
          }`}
        >
          {page}
        </a>
      ))}
      {currentPage < totalPages && (
        <a
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-3 py-2 rounded-lg text-sm font-bold text-foreground/60 hover:text-brand-orange transition-colors"
        >
          →
        </a>
      )}
    </nav>
  );
}
