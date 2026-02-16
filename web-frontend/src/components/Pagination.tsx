import { useState } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onGoToPage: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onNextPage, onPreviousPage, onGoToPage }: PaginationProps) {
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const [pressedBtn, setPressedBtn] = useState<string | null>(null);

  if (totalPages <= 1) return null;

  const renderButton = (
    onClick: () => void,
    disabled: boolean,
    label: string,
    btnKey: string
  ) => {
    const isHovered = hoveredBtn === btnKey;
    const isPressed = pressedBtn === btnKey;

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => !disabled && setHoveredBtn(btnKey)}
        onMouseLeave={() => {
          setHoveredBtn(null);
          setPressedBtn(null);
        }}
        onMouseDown={() => !disabled && setPressedBtn(btnKey)}
        onMouseUp={() => setPressedBtn(null)}
        style={{
          background: disabled
            ? "var(--arcade-panel)"
            : isHovered
            ? "var(--arcade-accent)"
            : "var(--arcade-cta)",
          border: `3px solid ${
            disabled
              ? "var(--arcade-shadow)"
              : isHovered
              ? "var(--arcade-h)"
              : "var(--arcade-text)"
          }`,
          boxShadow: disabled
            ? "none"
            : isPressed
            ? "0 0 0 var(--arcade-shadow)"
            : "4px 4px 0px var(--arcade-shadow)",
          transform: isPressed ? "translate(4px,4px)" : "translate(0,0)",
          color: disabled ? "var(--arcade-muted)" : "#fff",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.45rem",
          padding: "12px 20px",
          cursor: disabled ? "not-allowed" : "pointer",
          letterSpacing: "0.06em",
          transition: "background 0.08s, border-color 0.08s",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {label}
      </button>
    );
  };

  const renderPageButton = (page: number) => {
    const isActive = currentPage === page;
    const isHovered = hoveredBtn === `page-${page}`;
    const isPressed = pressedBtn === `page-${page}`;

    return (
      <button
        key={page}
        onClick={() => onGoToPage(page)}
        onMouseEnter={() => setHoveredBtn(`page-${page}`)}
        onMouseLeave={() => {
          setHoveredBtn(null);
          setPressedBtn(null);
        }}
        onMouseDown={() => setPressedBtn(`page-${page}`)}
        onMouseUp={() => setPressedBtn(null)}
        style={{
          width: "44px",
          height: "44px",
          background: isActive
            ? "var(--arcade-h)"
            : isHovered
            ? "var(--arcade-accent)"
            : "var(--arcade-panel)",
          border: `3px solid ${
            isActive
              ? "var(--arcade-h-shadow)"
              : isHovered
              ? "var(--arcade-accent-dark)"
              : "var(--arcade-border)"
          }`,
          boxShadow: isPressed
            ? "0 0 0 var(--arcade-shadow)"
            : isActive
            ? "3px 3px 0px var(--arcade-h-shadow)"
            : "3px 3px 0px var(--arcade-shadow)",
          transform: isPressed ? "translate(3px,3px)" : "translate(0,0)",
          color: isActive ? "#000" : isHovered ? "#fff" : "var(--arcade-text)",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.45rem",
          cursor: "pointer",
          letterSpacing: "0.04em",
          transition: "all 0.08s",
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
      {renderButton(
        onPreviousPage,
        currentPage === 1,
        "◄ PREV",
        "prev"
      )}

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) =>
          renderPageButton(page)
        )}
      </div>

      {renderButton(
        onNextPage,
        currentPage === totalPages,
        "NEXT ►",
        "next"
      )}
    </div>
  );
}

export default Pagination;
