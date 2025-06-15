import { useState, useRef, useEffect } from "preact/hooks";
import CharacterList, { Character } from "../components/CharacterList.tsx";

type Props = {
  characters: Character[];
};

export default function SearchOnly({ characters }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const timeoutRef = useRef<number | null>(null);
  const [filteredCharacters, setFilteredCharacters] = useState(characters);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      const filtered = characters.filter(char =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCharacters(filtered);
    }, 500);
  }, [searchTerm, characters]);

  return (
    <div>
      <h2>Buscar Personajes</h2>
      <input
        type="text"
        placeholder="Buscar personaje..."
        value={searchTerm}
        onInput={e => setSearchTerm((e.target as HTMLInputElement).value)}
      />

      {filteredCharacters.length === 0 ? (
        <p>No hay personajes</p>
      ) : (
        <CharacterList characters={filteredCharacters} />
      )}
    </div>
  );
}