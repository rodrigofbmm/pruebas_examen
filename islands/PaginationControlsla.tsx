import { useState, useEffect } from "preact/hooks";
import SearchBar from "./SearchBarIsla.tsx";
import CharacterList, { Character } from "../components/CharacterList.tsx";

type Props = {
  characters: Character[];
  pageSize?: number;
};

export default function PaginationControls({ characters, pageSize = 10 }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0); // Reset page when search changes
  }, [searchTerm]);

  const filtered = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const currentSlice = filtered.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div>
      <SearchBar onSearch={setSearchTerm} />

      <div className="pagination-controls">
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Anterior
        </button>
        <span>Página {page + 1} de {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1}>
          Siguiente
        </button>
      </div>

      {currentSlice.length === 0
        ? <p>No hay personajes</p>
        : <CharacterList characters={currentSlice} />}
    </div>
  );
}
