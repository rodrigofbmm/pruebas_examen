// islands/SearchBarIsla.tsx
import { useState, useEffect } from "preact/hooks";

type Props = {
  onSearch: (term: string) => void;
};

export default function SearchBarIsla({ onSearch }: Props) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(input);
    }, 300); // debounce para no buscar cada tecla

    return () => clearTimeout(timeout);
  }, [input]);

  return (
    <input
      type="text"
      placeholder="Buscar personaje..."
      value={input}
      onInput={(e) => setInput((e.target as HTMLInputElement).value)}
      className="border p-2 rounded w-full"
    />
  );
}
