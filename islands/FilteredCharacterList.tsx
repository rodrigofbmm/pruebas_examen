// islands/FilteredCharacterList.tsx
import { useState, useEffect } from "preact/hooks";
import SearchBar from "./SearchBarIsla.tsx";
import CharacterList, { Character } from "../components/CharacterList.tsx";

type Props = {
  characters: Character[];
};

export default function FilteredCharacterList({ characters }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState<Character[]>(characters);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = characters.filter((char) =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFiltered(result);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, characters]);

  return (
    <div>
      <SearchBar onSearch={setSearchTerm} />
      {filtered.length === 0 ? <p>No se encontraron personajes.</p> : <CharacterList characters={filtered} />}
    </div>
  );
}
