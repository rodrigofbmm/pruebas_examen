// components/PaginationControls.tsx
type Props = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function PaginationControls({ currentPage, totalPages, onPrev, onNext }: Props) {
  return (
    <div className="pagination-controls">
      <button onClick={onPrev} disabled={currentPage === 0}>
        Anterior
      </button>
      <span>
        Página {currentPage + 1} de {totalPages}
      </span>
      <button onClick={onNext} disabled={currentPage >= totalPages - 1}>
        Siguiente
      </button>
    </div>
  );
}
