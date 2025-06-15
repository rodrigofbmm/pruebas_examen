import { useState, useRef, useEffect } from "preact/hooks";
import CharacterList, { Character } from "../components/CharacterList.tsx";

type Props = {
  characters: Character[];
  pageSize?: number;
};

export default function Pagination({ characters, pageSize = 10 }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setPage(0);
    }, 500);
  }, [searchTerm]);

  const filtered = characters.filter(char =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const currentSlice = filtered.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div>
      <h2>Buscar Personajes</h2>
      <input
        type="text"
        placeholder="Buscar personaje..."
        value={searchTerm}
        onInput={e => setSearchTerm((e.target as HTMLInputElement).value)}
      />

      <div className="pagination-controls">
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Anterior
        </button>
        <span>
          Página {page + 1} de {totalPages}
        </span>
        <button onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1}>
          Siguiente
        </button>
      </div>

      {currentSlice.length === 0 ? <p>No hay personajes</p> : <CharacterList characters={currentSlice} />}
    </div>
  );
}
