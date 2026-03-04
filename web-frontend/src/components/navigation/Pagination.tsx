interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onGoToPage: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onNextPage, onPreviousPage, onGoToPage }: PaginationProps) {
  if (totalPages <= 1) return null;

  const renderButton = (onClick: () => void, disabled: boolean, label: string) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="border-solid [background:var(--arcade-cta)] [border-color:var(--arcade-text)] text-white [box-shadow:4px_4px_0px_var(--arcade-shadow)] cursor-pointer hover:[background:var(--arcade-accent)] hover:[border-color:var(--arcade-h)] active:[box-shadow:0_0_0_var(--arcade-shadow)] active:[transform:translate(4px,4px)] disabled:[background:var(--arcade-panel)] disabled:[border-color:var(--arcade-shadow)] disabled:[color:var(--arcade-muted)] disabled:opacity-50 disabled:cursor-not-allowed disabled:[box-shadow:none] transition-[background,border-color] duration-[80ms]"
      style={{
        borderWidth: "3px",
        borderStyle: "solid",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "0.45rem",
        padding: "12px 20px",
        letterSpacing: "0.06em",
      }}
    >
      {label}
    </button>
  );

  const renderPageButton = (page: number) => {
    const isActive = currentPage === page;
    return (
      <button
        key={page}
        onClick={() => onGoToPage(page)}
        className={
          isActive
            ? "[background:var(--arcade-h)] border-solid [border-color:var(--arcade-h-shadow)] [color:#000] [box-shadow:3px_3px_0px_var(--arcade-h-shadow)] cursor-pointer transition-all duration-[80ms]"
            : "[background:var(--arcade-panel)] border-solid [border-color:var(--arcade-border)] [color:var(--arcade-text)] [box-shadow:3px_3px_0px_var(--arcade-shadow)] cursor-pointer hover:[background:var(--arcade-accent)] hover:[border-color:var(--arcade-accent-dark)] hover:text-white active:[box-shadow:0_0_0_var(--arcade-shadow)] active:[transform:translate(3px,3px)] transition-all duration-[80ms]"
        }
        style={{
          width: "44px",
          height: "44px",
          borderWidth: "3px",
          borderStyle: "solid",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.45rem",
          letterSpacing: "0.04em",
        }}
      >
        {page}
      </button>
    );
  };

  return (
    <div
      style={{
        marginTop: "48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      {renderButton(onPreviousPage, currentPage === 1, "◄ PREV")}

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) =>
          renderPageButton(page)
        )}
      </div>

      {renderButton(onNextPage, currentPage === totalPages, "NEXT ►")}
    </div>
  );
}

export default Pagination;
