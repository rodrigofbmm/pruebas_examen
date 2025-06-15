// components/SearchBar.tsx
type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Buscar personaje..."
      value={value}
      onInput={(e) => onChange((e.target as HTMLInputElement).value)}
    />
  );
}
