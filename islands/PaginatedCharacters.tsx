// islands/PaginatedCharacters.tsx
import { useState, useRef, useEffect } from "preact/hooks";
import CharacterList, { Character } from "../components/CharacterList.tsx";
import SearchBar from "../components/SearchBar.tsx";
import PaginationControls from "../components/PaginationControls.tsx";

type Props = {
  characters: Character[];
  pageSize?: number;
};

export default function PaginatedCharacters({ characters, pageSize = 10 }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setPage(0);
    }, 500);
  }, [searchTerm]);

  const filtered = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const currentSlice = filtered.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div>
      <h2>Buscar Personajes</h2>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
      />

      {currentSlice.length === 0 ? (
        <p>No hay personajes</p>
      ) : (
        <CharacterList characters={currentSlice} />
      )}
    </div>
  );
}
